package org.acme.services;

import io.smallrye.mutiny.subscription.MultiEmitter;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.dto.response.NotificationDTO;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
public class NotificationService {
    private final Set<MultiEmitter<? super NotificationDTO>> emitters = ConcurrentHashMap.newKeySet();

    public void registerEmitter(MultiEmitter<? super NotificationDTO> emitter) {
        emitters.add(emitter);
        emitter.onTermination(() -> emitters.remove(emitter));
    }

    public void sendMsg(NotificationDTO msg) {
        emitters.forEach(emitter -> {
            if (!emitter.isCancelled()) {
                emitter.emit(msg);
            }
        });
    }
}
