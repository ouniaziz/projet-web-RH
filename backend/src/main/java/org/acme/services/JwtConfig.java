package org.acme.services;

import jakarta.enterprise.context.ApplicationScoped;

public class JwtConfig {
    public static final String getIssuer() {
        return "quarkus"; // Should match the issuer configured in your JWT settings
    }
}
