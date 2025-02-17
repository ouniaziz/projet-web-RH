package org.acme.brevo.entities;

import java.util.Map;

import org.acme.brevo.contracts.BrevoTemplate;

public class BrevoPasswordResetTemplate implements BrevoTemplate{

    String url;

    public BrevoPasswordResetTemplate(String url){
        this.url = url;
    }

    @Override
    public long template() {
        return 2;
    }

    @Override
    public Map<String, String> params() {
        return Map.of("url", url);
    }
    
}