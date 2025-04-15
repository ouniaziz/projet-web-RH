package org.acme.services;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.operators.multi.processors.UnicastProcessor;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.dto.response.NotificationDTO;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
//TODO: Test this bad boy out
public class NotificationService {

    private final Map<String, UnicastProcessor<NotificationDTO>> userEmitters =
            new ConcurrentHashMap<>();

    private final Map<Long, Set<String>> groupMemberships =
            new ConcurrentHashMap<>();

    // Register a user and return their personal stream
    public Multi<NotificationDTO> registerUser(String userId) {
        UnicastProcessor<NotificationDTO> processor = UnicastProcessor.create();
        userEmitters.put(userId, processor);

        return processor
                .onTermination().invoke(() -> {
                    userEmitters.remove(userId);
                    removeFromRole(userId);
                });
    }

    // Send to specific user
    public void sendMsg(String userId, NotificationDTO msg) {
        UnicastProcessor<NotificationDTO> emitter = userEmitters.get(userId);
        if (emitter != null) {
            emitter.onNext(msg);
        }
    }

    public void createRole(Long role, String userId) {
        groupMemberships
                .computeIfAbsent(role, k -> ConcurrentHashMap.newKeySet())
                .add(userId);
    }

    public void sendToRole(Long roleId, NotificationDTO message) {
        Set<String> members = groupMemberships.get(roleId);
        if (members != null) {
            members.forEach(userId -> sendMsg(userId, message));
        }
    }

    private void removeFromRole(String userId) {
        groupMemberships.forEach((groupId, members) -> members.remove(userId));
    }

}
