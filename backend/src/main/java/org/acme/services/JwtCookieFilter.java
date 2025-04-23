package org.acme.services;

import com.auth0.jwt.JWTVerifier;
import jakarta.annotation.Priority;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Cookie;
import jakarta.ws.rs.ext.Provider;

@Provider
@Priority(Priorities.AUTHENTICATION) // Runs before JWT validation
public class JwtCookieFilter implements ContainerRequestFilter {
    @Inject
    JwtService validator;

    @Override
    public void filter(ContainerRequestContext ctx) {
        Cookie accessToken = ctx.getCookies().get("access_token");
        if (accessToken!=null && !validator.isTokenExpired(accessToken.getValue())) {
            ctx.getHeaders().putSingle("Authorization", "Bearer " + accessToken.getValue());
            return;
        }

        // Auto-refresh flow
        //TODO: this doesn't validate that refresh token was signed by the backend, it only checks if it expired
        Cookie refreshToken = ctx.getCookies().get("refresh_token");
        if (refreshToken != null && validator.isTokenExpired(refreshToken.getValue())) {
            String newAccessToken = validator.generateAccessFromRefresh(refreshToken.getValue());
            ctx.getHeaders().putSingle("Authorization", "Bearer " + newAccessToken);
            ctx.getHeaders().add("Set-Cookie",
                    "access_token=" + newAccessToken + "; HttpOnly; Secure; SameSite=Strict");
        }

    }
}