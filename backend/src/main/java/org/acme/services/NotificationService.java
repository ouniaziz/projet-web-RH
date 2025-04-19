package org.acme.services;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.infrastructure.Infrastructure;
import io.smallrye.mutiny.operators.multi.processors.UnicastProcessor;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.acme.entities.Notification;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

// TODO: notify people by role, Test it out

// TODO: Check if enseignants and employés roles need to be added
// For now, I'll just include RH and Administrator roles, which will make this join role and ignore requests where roleId != Admin AND RH
@ApplicationScoped
public class NotificationService {

    private final Map<String, UnicastProcessor<Notification>> userEmitters =
            new ConcurrentHashMap<>();

    private final Map<Long, Set<String>> roleEmitters =
            new ConcurrentHashMap<>();

    @PostConstruct
    public void initRoleEmitters(){
        Uni.createFrom().item(()->{
            createRole(RolePerson.ADMIN_ID);
            createRole(RolePerson.RH_ID);
            return null;
        }).runSubscriptionOn(Infrastructure.getDefaultWorkerPool())
                .subscribe().with(success->{}, Throwable::getStackTrace);
    }

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
                     // removeFromRole(userId); TODO: removeFromRole when you delete Person record
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

    public void createRole(Long role) {
        roleEmitters
                .computeIfAbsent(role, roleId -> Person.find("SELECT DISTINCT p.cin FROM Person p WHERE p.role.id_r=?1", roleId)
                        .project(String.class).stream().collect(Collectors.toCollection(ConcurrentHashMap::newKeySet)));
    }

    public void sendToRole(Long roleId, Notification notification) {
        Set<String> members = roleEmitters.get(roleId);
        if (members != null) {
            members.forEach(userId -> sendMsg(notification));
        }
    }

    //@Scheduled(every = "1h") To be tested
    void cleanupInactiveUsers() {
        userEmitters.entrySet().removeIf(entry ->
                !entry.getValue().hasSubscriber()
        );
    }
}
