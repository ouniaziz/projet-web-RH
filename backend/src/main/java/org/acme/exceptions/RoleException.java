package org.acme.exceptions;

public class RoleException extends RuntimeException{
    public int status;
    public RoleException(String msg, int s){
        super(msg); status=s;
    }
}
