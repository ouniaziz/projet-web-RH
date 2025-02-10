package org.acme.interfaces;

import java.util.Map;

interface BrevoTemplateInt{
    long template();
    Map<String, String> params();
}

public class BrevoTemplate implements BrevoTemplateInt{
    String  username;
    String url;

    public BrevoTemplate(String us, String ur){username = us;url = ur;}

    @Override
    public long template() {
        return 1;
    }

    @Override
    public Map<String, String> params() {
        return Map.of("username", username, "url", url);
    }
    
}
