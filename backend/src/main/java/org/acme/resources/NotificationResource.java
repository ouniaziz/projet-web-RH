package org.acme.resources;

import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.dto.response.NotificationDTO;
import org.acme.services.NotificationService;


@Path("/notify")
@Singleton
public class NotificationResource {

    @Inject NotificationService notificationService;


    @GET
    @Path("/user/{userId}")
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Multi<NotificationDTO> userStream(@PathParam("userId") String userId) {
        return notificationService.registerUser(userId);
    }

    // Group joining endpoint
    @POST
    @Path("/role/{roleId}/{userId}")
    public void joinGroup(
            @PathParam("roleId") Long roleId,
            @PathParam("userId") String userId) {

        notificationService.createRole(roleId, userId);
    }
}
