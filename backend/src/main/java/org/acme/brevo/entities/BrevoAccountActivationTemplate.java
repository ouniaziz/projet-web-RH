package org.acme.brevo.entities;

import java.util.Map;

import org.acme.brevo.contracts.BrevoTemplate;

public class BrevoAccountActivationTemplate implements BrevoTemplate{
  
    String  username;
    String url;

    public BrevoAccountActivationTemplate(String username, String url){
        this.username = username;
        this.url = url;
        
    }

    @Override
    public long template() {
        return 1;
    }

    @Override
    public Map<String, String> params() {
        return Map.of("username", username, "url", url);
    }
    
}

