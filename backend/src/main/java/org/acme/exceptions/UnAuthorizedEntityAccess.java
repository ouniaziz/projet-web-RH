package org.acme.exceptions;

public class UnAuthorizedEntityAccess extends RuntimeException{
    public UnAuthorizedEntityAccess(String msg){
        super(msg);
    }
}
