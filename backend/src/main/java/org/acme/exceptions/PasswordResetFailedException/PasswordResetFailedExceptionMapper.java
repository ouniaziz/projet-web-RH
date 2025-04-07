package org.acme.exceptions.PasswordResetFailedException;
import org.acme.dto.response.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class PasswordResetFailedExceptionMapper implements ExceptionMapper<PasswordResetFailedException>{

    @Override
    public Response toResponse(PasswordResetFailedException exception) {
        return Response.status(exception.status).entity(new ApiResponseDTO(exception.status, null, exception.getMessage(), null)).build();
    }
    
}