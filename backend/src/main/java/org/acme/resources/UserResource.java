package org.acme.resources;

import org.acme.entities.LoginRequest;
import org.acme.services.CustomAuthService;
import org.acme.services.JwtService;

import io.quarkus.security.credential.PasswordCredential;
import io.quarkus.security.identity.request.UsernamePasswordAuthenticationRequest;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

/**TODO: Look at deepseek to continue on your yesterday's work: auth + JWT access and refresh token 
 * TODO: Implement forgot password
*/
public class UserResource {
    
    @Inject CustomAuthService authService;

    @POST
    public Uni<Response> login(LoginRequest loginRequest){
        return authService.authenticate(
            new UsernamePasswordAuthenticationRequest(
                loginRequest.getUsername(), 
                new PasswordCredential(loginRequest.getPassword().toCharArray())), null).onItem()
            
            .transform((securityIden)-> {
                String accessToken = JwtService.generateAccessToken(securityIden);
                String refreshToken = JwtService.generateAccessToken(securityIden); 
                return Response.ok().entity(new LoginResponse(accessToken, refreshToken)).build();
            }).onFailure().recoverWithItem(()-> Response.status(Response.Status.UNAUTHORIZED).build());
    }
}
