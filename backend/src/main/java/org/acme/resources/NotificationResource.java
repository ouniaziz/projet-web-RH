package org.acme.resources;

import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.subscription.MultiEmitter;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.acme.dto.response.NotificationDTO;
import org.acme.services.NotificationService;
import org.jboss.resteasy.reactive.RestStreamElementType;

@Path("/notify")
public class NotificationResource {
    @Inject
    NotificationService notifService;

    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    public Multi<NotificationDTO> getNotifications(){
        return Multi.createFrom().emitter(multiEmitter -> {
            notifService.registerEmitter(multiEmitter);

        });
    }
}
