package org.acme.exceptions.ActivationFailedExceptions;

public class ActivationFailedException extends RuntimeException{
    int status;
    public ActivationFailedException(String msg, int status) {
        super(msg);this.status = status;
    }
    
}

