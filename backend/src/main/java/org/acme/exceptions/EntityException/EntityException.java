package org.acme.exceptions.EntityException;

public class EntityException extends RuntimeException{
    int status;
    public EntityException(String msg, int status){
        super(msg);
        this.status = status;
    }
}
