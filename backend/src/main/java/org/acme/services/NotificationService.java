package org.acme.services;

import io.quarkus.hibernate.orm.panache.Panache;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.infrastructure.Infrastructure;
import io.smallrye.mutiny.operators.multi.processors.UnicastProcessor;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.acme.entities.Notification;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
//TODO: Add persistence storage
public class NotificationService {

    private final Map<String, UnicastProcessor<Notification>> userEmitters =
            new ConcurrentHashMap<>();

    private final Map<Long, Set<String>> groupMemberships =
            new ConcurrentHashMap<>();

    public List<Notification> getUndeliveredNotifications(String userId){
        return Notification.list("userId =?1 AND isDelivered = false", userId);
    }

    @Transactional
    public void markDelivered(String userId){
        Notification.update("isDelivered = true WHERE userId=?1", userId);
    }

    public Multi<Notification> registerUser(String userId) {
        UnicastProcessor<Notification> processor = UnicastProcessor.create();
        userEmitters.put(userId, processor);

        return processor
                .onTermination().invoke(() -> {
                    userEmitters.remove(userId);
                    removeFromRole(userId);
                })
                .onSubscription().invoke(()->{ // We use onSubscription to run methods right before it subscribes <=> right before receiving new notifications
                    Uni.createFrom().item(()->{
                        List<Notification> pendingList = getUndeliveredNotifications(userId);
                        if(!pendingList.isEmpty()){
                            pendingList.forEach(processor::onNext);
                            markDelivered(userId);
                        }
                        return null;
                    }).runSubscriptionOn(Infrastructure.getDefaultWorkerPool())
                            .subscribe().with(succes->{}, Throwable::getStackTrace);
                });
    }

    public void sendMsg(Notification notification) {
        UnicastProcessor<Notification> emitter = userEmitters.get(notification.getUserId());
        if (emitter != null) {
            emitter.onNext(notification);
        }
        else{
            notification.persist(); // Save notif
        }
    }

    public void createRole(Long role, String userId) {
        groupMemberships
                .computeIfAbsent(role, k -> ConcurrentHashMap.newKeySet())
                .add(userId);
    }

    public void sendToRole(Long roleId, Notification notification) {
        Set<String> members = groupMemberships.get(roleId);
        if (members != null) {
            members.forEach(userId -> sendMsg(notification));
        }
    }

    private void removeFromRole(String userId) {
        groupMemberships.forEach((groupId, members) -> members.remove(userId));
    }

}
