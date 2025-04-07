package org.acme.exceptions.ActivationFailedExceptions;
import org.acme.dto.response.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class ActivationFailedExceptionMapper implements ExceptionMapper<ActivationFailedException>{

    @Override
    public Response toResponse(ActivationFailedException exception) {
        return Response.status(exception.status).entity(new ApiResponseDTO(exception.status, null, exception.getMessage(), null)).build();
    }
    
}