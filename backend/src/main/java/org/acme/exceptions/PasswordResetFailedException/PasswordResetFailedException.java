package org.acme.exceptions.PasswordResetFailedException;

public class PasswordResetFailedException extends RuntimeException{
    int status;
    public PasswordResetFailedException(String msg, int status){
        super(msg);this.status = status;
    }
}
