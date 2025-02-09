package org.acme.exceptions;

public class PersonException extends RuntimeException{
    public int status;

    public PersonException(String msg, int status){
        super(msg); this.status = status;
    }
}
