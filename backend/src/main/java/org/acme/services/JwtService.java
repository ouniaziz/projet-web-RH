package org.acme.services;

import java.time.Duration;
import java.util.Date;
import java.util.Set;

import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import org.acme.exceptions.EntityException.EntityException;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.quarkus.security.identity.SecurityIdentity;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class JwtService {
	public static Duration ACCESS_TOKEN_DURATION = Duration.ofDays(3);
	public static Duration REFRESH_TOKEN_DURATION = Duration.ofDays(7);

	@Inject Logger log;
	@Inject JsonWebToken jsonWebToken;
	@Inject
	JWTParser jsonParser;


	public  String generateAccessToken(SecurityIdentity securityIden) {
		String cin = securityIden.getPrincipal().getName();
		Set<String> roles = securityIden.getRoles();

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.claim("type", "access")
				.groups(roles)
				.expiresIn(ACCESS_TOKEN_DURATION)
				.sign();
	}

	public  String generateRefreshToken(SecurityIdentity securityIden) {
		String cin = securityIden.getPrincipal().getName();
		Set<String> roles = securityIden.getRoles();

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.claim("type","refresh")
				.groups(roles)
				.expiresIn(REFRESH_TOKEN_DURATION)
				.sign();
	}

    public  String generateActivationToken(String cin, String role){

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(cin)
				.groups(role)
				.expiresIn(Duration.ofDays(10))
				.sign();
	}

	public  String generateResetPasswordToken(String email){

		return Jwt.issuer(JwtConfig.getIssuer())
				.upn(email)
				.expiresIn(Duration.ofDays(1))
				.sign();
	}

    public boolean isTokenExpired(String token) {
        try{
			DecodedJWT decodedToken = JWT.decode(token);
			
			return decodedToken.getExpiresAt().before(new Date());
		}catch(JWTDecodeException e){
			e.printStackTrace();
			return true;
		}
    }

	public String getNonAuthUpn(String token){
		try{
			DecodedJWT decodedToken = JWT.decode(token);
			return decodedToken.getClaim("upn").asString();
		}catch(JWTDecodeException e){
			e.printStackTrace();
			return "-1";
		}
	}

	public String getAuthUpn(){
		return jsonWebToken.getName();
	}
	public Set<String> getAuthRoles(){
		return jsonWebToken.getGroups();
	}

	public String generateAccessFromRefresh(String refreshToken) {
		try {
            var decoded = jsonParser.parse(refreshToken);
			return Jwt.issuer(JwtConfig.getIssuer())
					.upn(decoded.getSubject())
					.claim("type", "access")
					.expiresIn(ACCESS_TOKEN_DURATION)
					.sign();
        } catch (ParseException e) {
            throw new EntityException("Couldn't parse refreshToken", 500);
        }


	}
}