package org.acme.exceptions.EntityException;

import org.acme.dto.response.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class EntityExceptionMapper implements ExceptionMapper<EntityException>  {

    @Override
    public Response toResponse(EntityException exception) {
        ApiResponseDTO apiResponse = new ApiResponseDTO(exception.status, null, exception.getMessage(), null);
        return Response.status(exception.status).entity(apiResponse).build();
    }
    
}
