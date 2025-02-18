package org.acme.resources;


import org.acme.DTO.ActivationRequestDTO;
import org.acme.DTO.ApiResponseDTO;
import org.acme.DTO.LoginRequestDTO;
import org.acme.DTO.LoginResponseDTO;
import org.acme.DTO.PasswordResetRequestDTO;
import org.acme.services.CustomAuthService;
import org.acme.services.JwtService;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.jboss.logging.Logger;
import io.quarkus.security.credential.PasswordCredential;
import io.quarkus.security.identity.request.UsernamePasswordAuthenticationRequest;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sendinblue.ApiException;

@Path("/api/users")


/**TODO: Added account verification token, now to add endpoint to activate account, the endpoint needs to take as body cin and as path the activate token
 * TODO: Look at deepseek to continue on your yesterday's work: auth + JWT access and refresh token 
 * TODO: Implement forgot password
*/

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @Inject CustomAuthService authService;
    @Inject JwtService jwtService;
    @Inject Logger log;

    @Path("/login")
    @POST
    @PermitAll
    @Blocking
    public Uni<Response> login(LoginRequestDTO loginRequest){
        return authService.authenticate(
            new UsernamePasswordAuthenticationRequest(
                loginRequest.getUsername(), 
                new PasswordCredential(loginRequest.getPassword().toCharArray())), null).onItem()
            
            .transform((securityIden)-> {
                log.warn("Beginning of transform");
                String accessToken = jwtService.generateAccessToken(securityIden);
                String refreshToken = jwtService.generateRefreshToken(securityIden); 
                log.warn("Generated tokens and ready to return");
                ApiResponseDTO response = new ApiResponseDTO(200, "Logged in successfully", null, new LoginResponseDTO(accessToken, refreshToken));
                return Response.ok().entity(response).build();
            });
    }


    @PUT
    @Path("/forgot-password/{email}")
    @PermitAll
    @Transactional
    public Response forgotPassword(@PathParam("email") String email){
        try{    
            authService.forgotPassword(email);
            return Response.status(200).entity(new ApiResponseDTO(200, "You shall receive an email", null, null)).build();
        }catch(ApiException e){
            return Response.status(500).entity(e).build();
        }
    }

    @PUT
    @Path("/reset-password/")
    @PermitAll
    @Transactional
    public Response resetPassowrd(PasswordResetRequestDTO passwordResetRequestDTO){
        authService.resetPassword(passwordResetRequestDTO);
        return Response.status(200).entity(new ApiResponseDTO(200, "reset password successfully", null, null)).build();
    }

    @PUT 
    @Path("/activate")
    @PermitAll
    @Transactional
    public Response activateAccount(ActivationRequestDTO activationRequest){
        authService.activate(activationRequest);
        
        return Response.status(200).entity(new ApiResponseDTO(200, activationRequest.cin()+" Account is activated", null, null)).build();
    }
}
