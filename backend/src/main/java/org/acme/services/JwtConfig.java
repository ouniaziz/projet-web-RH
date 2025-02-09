package org.acme.services;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JwtConfig {
    public final String getIssuer() {
        return "quarkus"; // Should match the issuer configured in your JWT settings
    }
}
