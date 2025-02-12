package org.acme.resources;


import org.acme.DTO.ActivationRequestDTO;
import org.acme.DTO.ApiResponseDTO;
import org.acme.DTO.LoginRequestDTO;
import org.acme.DTO.LoginResponseDTO;
import org.acme.services.CustomAuthService;
import org.acme.services.JwtService;

import io.quarkus.security.credential.PasswordCredential;
import io.quarkus.security.identity.request.UsernamePasswordAuthenticationRequest;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

/**TODO: Added account verification token, now to add endpoint to activate account, the endpoint needs to take as body cin and as path the activate token
 * TODO: Look at deepseek to continue on your yesterday's work: auth + JWT access and refresh token 
 * TODO: Implement forgot password
*/
public class UserResource {
    
    @Inject CustomAuthService authService;
    @Inject JwtService jwtService;

    @POST
    public Uni<Response> login(LoginRequestDTO loginRequest){
        return authService.authenticate(
            new UsernamePasswordAuthenticationRequest(
                loginRequest.getUsername(), 
                new PasswordCredential(loginRequest.getPassword().toCharArray())), null).onItem()
            
            .transform((securityIden)-> {
                String accessToken = jwtService.generateAccessToken(securityIden);
                String refreshToken = jwtService.generateRefreshToken(securityIden); 
                return Response.ok().entity(new LoginResponseDTO(accessToken, refreshToken)).build();
            }).onFailure().recoverWithItem(()-> Response.status(Response.Status.UNAUTHORIZED).build());
    }


    @PUT 
    @Path("/activate")
    public Response activateAccount(ActivationRequestDTO activationRequest){
        authService.activate(activationRequest);
        
        return Response.status(200).entity(new ApiResponseDTO(200, activationRequest.cin()+" Account is activated", null, null)).build();
    }
}
