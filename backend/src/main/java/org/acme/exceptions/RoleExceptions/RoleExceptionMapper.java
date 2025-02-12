package org.acme.exceptions.RoleExceptions;

import org.acme.DTO.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;



@Provider
public class RoleExceptionMapper implements ExceptionMapper<RoleException>{

    @Override
    public Response toResponse(RoleException exception) {
        ApiResponseDTO apiResponse = new ApiResponseDTO(exception.status, null, exception.getMessage(), null);
        return Response.status(exception.status).entity(apiResponse).build();
    }
    
}