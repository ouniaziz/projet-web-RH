package org.acme.resources;


import jakarta.ws.rs.core.NewCookie;
import org.acme.dto.auth.*;
import org.acme.dto.response.ApiResponseDTO;
import org.acme.dto.response.LoginResponseDTO;
import org.acme.services.CustomAuthService;
import org.acme.services.JwtService;
import org.jboss.logging.Logger;
import io.quarkus.security.credential.PasswordCredential;
import io.quarkus.security.identity.request.UsernamePasswordAuthenticationRequest;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import sendinblue.ApiException;

import java.time.Duration;

@Path("/api/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @Inject CustomAuthService authService;
    @Inject JwtService jwtService;
    @Inject Logger log;

    @Path("/login")
    @POST
    @Blocking
    public Uni<Response> login(LoginRequestDTO loginRequest){
        return authService.authenticate(
            new UsernamePasswordAuthenticationRequest(
                loginRequest.getUsername(), 
                new PasswordCredential(loginRequest.getPassword().toCharArray())), null)
                .onItem().transform((securityIden)-> {

                    String accessToken = jwtService.generateAccessToken(securityIden);
                    String refreshToken = jwtService.generateRefreshToken(securityIden);

                    ApiResponseDTO response = new ApiResponseDTO(200, "Logged in successfully", null, new LoginResponseDTO(securityIden.getAttribute("role"),securityIden.getAttribute("nom"), securityIden.getPrincipal().getName(), accessToken, refreshToken));
                    return Response.ok().entity(response).build();
                });
    }


    @PUT
    @Path("/forgot-password/{email}")
    @Transactional
    public Response forgotPassword(@PathParam("email") String email){
        try{    
            authService.forgotPassword(email);
            return Response.status(200).entity(new ApiResponseDTO(200, "You shall receive an email", null, null)).build();
        }catch(ApiException e){
            return Response.status(500).entity(new ApiResponseDTO(500, null, e.getMessage(), null)).build();
        }
    }

    @PUT
    @Path("/reset-password/")
    @Transactional
    public Response resetPassowrd(PasswordResetRequestDTO passwordResetRequestDTO){
        authService.resetPassword(passwordResetRequestDTO);
        return Response.status(200).entity(new ApiResponseDTO(200, "reset password successfully", null, null)).build();
    }

    @PUT 
    @Path("/activate")
    @Transactional
    public Response activateAccount(ActivationRequestDTO activationRequest){
        authService.activate(activationRequest);
        
        return Response.status(200).entity(new ApiResponseDTO(200, "Account is activated", null, null)).build();
    }

    @Path("/logout")
    @POST
    @Blocking
    public Response logout() {
        // Create expired cookies to clear them
        NewCookie clearAccessToken = new NewCookie.Builder("access_token")
                .value("").maxAge(0).path("/").build();

        NewCookie clearRefreshToken = new NewCookie.Builder("refresh_token")
                .value("").maxAge(0).path("/").build();

        return Response.ok().entity(new ApiResponseDTO(200, "Logged out successfully", null, null))
                .cookie(clearAccessToken, clearRefreshToken)
                .build();
    }


    @POST
    @Path("/refresh")
    @Consumes("application/json")
    public Response refreshToken(RefreshRequestDTO request) {
        // Validate the refresh token and generate a new JWT
        String newAccessToken = jwtService.generateAccessFromRefresh(request.getRefreshToken());
        RefreshResponseDTO refreshTokenResponse = new RefreshResponseDTO(newAccessToken, request.getRefreshToken());
        return Response.ok(refreshTokenResponse).build();
    }
}
