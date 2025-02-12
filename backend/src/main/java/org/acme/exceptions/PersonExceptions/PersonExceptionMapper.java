package org.acme.exceptions.PersonExceptions;

import org.acme.DTO.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
public class PersonExceptionMapper implements ExceptionMapper<PersonException>{
    

    @Override
    public Response toResponse(PersonException exception) {
        ApiResponseDTO apiResponse = new ApiResponseDTO(exception.status, null, exception.getMessage(), null);
        return Response.status(exception.status).entity(apiResponse).build();
    }
    
}
