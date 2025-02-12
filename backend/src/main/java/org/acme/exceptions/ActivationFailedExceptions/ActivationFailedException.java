package org.acme.exceptions.ActivationFailedExceptions;

import org.acme.DTO.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

public class ActivationFailedException extends RuntimeException{
    int status;
    public ActivationFailedException(String msg, int status) {
        super(msg);this.status = status;
    }
    
}

