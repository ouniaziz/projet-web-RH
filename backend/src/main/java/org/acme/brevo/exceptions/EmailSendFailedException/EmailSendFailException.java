package org.acme.brevo.exceptions.EmailSendFailedException;

public class EmailSendFailException extends RuntimeException{
    int status;
    public EmailSendFailException(String message, int status){
        super(message); this.status = status;
    }
}
