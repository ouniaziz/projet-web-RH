package org.acme.services;

import java.time.Duration;
import java.util.Date;
import java.util.Set;

import org.jboss.logging.Logger;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class JwtService {
	@Inject Logger log;

	public  String generateAccessToken(SecurityIdentity securityIden) {
		String cin = securityIden.getPrincipal().getName();
		Set<String> roles = securityIden.getRoles();

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.groups(roles)
				.expiresIn(Duration.ofDays(3))
				.sign();
	}

	public  String generateRefreshToken(SecurityIdentity securityIden) {
		String cin = securityIden.getPrincipal().getName();
		Set<String> roles = securityIden.getRoles();

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.groups(roles)
				.expiresIn(Duration.ofDays(7))
				.sign();
	}

    public  String generateActivationToken(String cin, String role){

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.groups(role)
				.expiresIn(Duration.ofDays(10))
				.sign();
	}

    public boolean isTokenExpired(String token) {
        try{
			DecodedJWT decodedToken = JWT.decode(token);
			
			return decodedToken.getExpiresAt().before(new Date());
		}catch(Exception e){
			e.printStackTrace();
			return true;
		}
    }
}
