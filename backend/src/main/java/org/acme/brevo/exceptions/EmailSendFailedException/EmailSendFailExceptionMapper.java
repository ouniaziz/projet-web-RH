package org.acme.brevo.exceptions.EmailSendFailedException;

import org.acme.dto.response.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class EmailSendFailExceptionMapper implements ExceptionMapper<EmailSendFailException>{

    @Override
    public Response toResponse(EmailSendFailException exception) {
        return Response.status(exception.status).entity(new ApiResponseDTO(exception.status, null, exception.getMessage(), null)).build();
    }

    
}
