package org.acme.exceptions;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class UnAuthorizedEntityAccessMapper implements ExceptionMapper<UnAuthorizedEntityAccess>{

    @Override
    public Response toResponse(UnAuthorizedEntityAccess exception) {
        return Response.status(403).entity(exception.getMessage()).build();
    }

}
