package org.acme.exceptions;

import io.quarkus.security.ForbiddenException;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class UnAuthorizedRoleAccessMapper implements ExceptionMapper<ForbiddenException>{

    @Inject
    SecurityContext securityContext;

    @Override
    public Response toResponse(ForbiddenException exception){
        String username = securityContext.getUserPrincipal().getName();
        String userRole;
        
        if(securityContext.isUserInRole("student"))
            userRole = "university or admin";   
        else
            userRole = "student or admin";
        return Response.status(Response.Status.FORBIDDEN).entity("Denied access for user "+ username+ ". Required Roles are "+userRole).build();
        
    }
}
