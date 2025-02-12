package org.acme.exceptions.PersonExceptions;

import org.acme.DTO.ApiResponseDTO;

import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;


public class PersonException extends RuntimeException{
    public int status;

    public PersonException(String msg, int status){
        super(msg); this.status = status;
    }
}


