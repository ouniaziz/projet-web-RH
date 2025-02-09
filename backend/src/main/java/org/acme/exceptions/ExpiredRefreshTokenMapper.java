package org.acme.exceptions;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ExpiredRefreshTokenMapper implements ExceptionMapper<ExpiredRefreshTokenException>{
    @Override
    public Response toResponse(ExpiredRefreshTokenException exception){

        return Response.status(401).entity("Invalid Refresh Token").build();
    }
}
