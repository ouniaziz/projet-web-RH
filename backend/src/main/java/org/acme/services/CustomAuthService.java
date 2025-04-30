package org.acme.services;


import jakarta.persistence.Tuple;
import org.acme.dto.auth.ActivationRequestDTO;
import org.acme.dto.auth.PasswordResetRequestDTO;
import org.acme.dto.PersonStatusDTO;
import org.acme.brevo.entities.BrevoPasswordResetTemplate;
import org.acme.brevo.services.BrevoService;
import org.acme.entities.Person;
import org.acme.entities.User;
import org.acme.exceptions.ActivationFailedExceptions.ActivationFailedException;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.exceptions.PasswordResetFailedException.PasswordResetFailedException;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.UserRepository;
import org.jboss.logging.Logger;

import io.quarkus.security.AuthenticationFailedException;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.IdentityProvider;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.request.UsernamePasswordAuthenticationRequest;
import io.quarkus.security.runtime.QuarkusPrincipal;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import sendinblue.ApiException;

import java.util.Optional;


@ApplicationScoped
public class CustomAuthService implements IdentityProvider<UsernamePasswordAuthenticationRequest>{

    @Inject UserRepository userRepo;
    @Inject PersonRepository personRepo;
    @Inject JwtService jwtService;
    @Inject Logger log;
    @Inject BrevoService brevoService;

    @Override
    public Class<UsernamePasswordAuthenticationRequest> getRequestType() {
        return UsernamePasswordAuthenticationRequest.class;
    }

    
    @Override
    public Uni<SecurityIdentity> authenticate(UsernamePasswordAuthenticationRequest request,
            AuthenticationRequestContext context) {
        
                User user = userRepo.findByEmailOrCin(request.getUsername())
                        .orElseThrow(()-> new AuthenticationFailedException("invalid email or cin"));
                
                if(user.getStatus_passw()==User.PASSWORD_NOT_ACTIVE)
                    throw new AuthenticationFailedException("Account not activated");
                
                if(user.getStatus_passw() == User.PASSWORD_FORGOT){
                    /*  TODO: How to treat an authentication to an account that requested password reset
                        Remove password reset token or not let him log in
                    */
                }
                if(!PasswordUtils.checkPassword(String.valueOf(request.getPassword().getPassword()), user.getPassw()))
                    throw new AuthenticationFailedException("Invalid password");
                
                Tuple personTuple = personRepo.find("SELECT p.cin cin, p.nom nom, p.prenom prenom, p.role.nom_r role FROM Person p WHERE p.cin = ?1",user.getCin()).project(Tuple.class)
                        .singleResultOptional().orElseThrow(()-> new AuthenticationFailedException("User not found"));

                
                return Uni.createFrom().item(
                    QuarkusSecurityIdentity.builder()
                        .setPrincipal(new QuarkusPrincipal(personTuple.get("cin", String.class)))
                        .addAttribute("nom",personTuple.get("prenom",String.class)+" "+personTuple.get("nom", String.class))
                        .addAttribute("role", personTuple.get("role", String.class))
                        .addRole(personTuple.get("role", String.class))
                        .addCredential(request.getPassword())
                        .setAnonymous(false)
                        .build()
                );
    }
    
    
    /*
        status_passw = 0 and pass_token !="" ==> account not activated OR user forgot his password and still didn't reinitialized it

        status_passw = 1 and pass_token =="" ==> account activated

        if status_passw != 1 AND 0 (for example -1), then token exceeded expiry date and should be re-generated
     */
    
    public void forgotPassword(String email) throws ApiException{
        PersonStatusDTO personStatus = personRepo.findStatusByEmail(email)
                                        .orElseThrow(()-> new PasswordResetFailedException("No record of user with email "+ email, 404));
        if(personStatus.status_p()==0)
            throw new PasswordResetFailedException("Your account is yet to be activated. Please activate it using the link we sent in the email", 403);
        
        if(personStatus.status_p() == -1)
            throw new PasswordResetFailedException("Your account is archived, please contact the admin", 403);
        
        User user = userRepo.findByEmail(email).get();
        // prevent from reaching max email requests
        if(user.getStatus_passw()==User.PASSWORD_FORGOT && !user.getPass_token().trim().isEmpty())
            throw new PasswordResetFailedException("A password-reseting email has already been sent to "+email, 403);
        
        // generate token, add it to user and send it via email. Maybe create custom email template
        
        // Don't need to create extra column for token expiry date, because
        // when verifying the token after giving new password, if the tokens (the provided and the hashed) are the same, 
        // BUT the expiry date of the provided token far exceeds current date, then the account won't be activated (status_passw =0)
        // BUT the token will be removed, then we'd need to yet again send a password_reset request
        // In that case, we should add another state= -1 (-1: account not activated, 0: password reset, 1: all is good)
            
        String token =jwtService.generateResetPasswordToken(email);
        user.setStatus_passw(User.PASSWORD_FORGOT);
        user.setPass_token(PasswordUtils.hashPassword(token));

        brevoService.sendEmail(email, "Password reset", new BrevoPasswordResetTemplate("localhost:8081/"+token));
    }

    
    public void resetPassword(PasswordResetRequestDTO passwordResetRequestDTO){
        String email = jwtService.getNonAuthUpn(passwordResetRequestDTO.token());
        
        PersonStatusDTO personStatus = personRepo.findStatusByEmail(email)
                                        .orElseThrow(()-> new PasswordResetFailedException("No record of user with email "+ email, 404));
        if(personStatus.status_p()==Person.STATUS_PERSON_ACTIVE)
            throw new PasswordResetFailedException("Your account is yet to be activated. Please activate it using the link we sent in the email", 403);
        if(personStatus.status_p() == Person.STATUS_PERSON_ARCHIVED)
            throw new PasswordResetFailedException("Your account is archived, please contact the admin", 403);
        User user = userRepo.findByEmail(email).get();

        if(user.getStatus_passw()!=User.PASSWORD_FORGOT)
            throw new PasswordResetFailedException("Account didn't issue password reset request", 403);
        
        if(!PasswordUtils.checkPassword(passwordResetRequestDTO.token(), user.getPass_token()))
            throw new PasswordResetFailedException("Invalid reset token", 401);
        
        if(jwtService.isTokenExpired(passwordResetRequestDTO.token())){
            // remove expired token
            user.setPass_token("");
            throw new PasswordResetFailedException("Token expired, please try to reset password", 403);
        }

        user.setPassw(PasswordUtils.hashPassword(passwordResetRequestDTO.password()));
        user.setStatus_passw(1);
        user.setPass_token("");
    }

    
    public void activate(ActivationRequestDTO activationRequestDTO){
        String cin = jwtService.getNonAuthUpn(activationRequestDTO.token());
        User user = userRepo.findByIdOptional(cin).orElseThrow(()->new EntityException("user cin="+cin+" not found", 404));
        
        if(user.getStatus_passw()!=User.PASSWORD_NOT_ACTIVE)
            throw new ActivationFailedException("user "+cin+" already activated", 409);
        
        else if(user.getPass_token() ==null || user.getPass_token().isEmpty())
            throw new ActivationFailedException("activation token not found", 404);
        
        else if(!PasswordUtils.checkPassword(activationRequestDTO.token(), user.getPass_token()))
            throw new ActivationFailedException("invalid activation token", 401);
        
        if(jwtService.isTokenExpired(activationRequestDTO.token()))
            throw new ActivationFailedException("Provided token is expired, please contact the administrator", 401);

        Person person = personRepo.findByIdOptional(cin).orElseThrow(()-> new EntityException("Person cin="+cin+ " not found", 404));
        
        // perform activation
        person.setStatus_p(Person.STATUS_PERSON_ACTIVE);
        //personRepo.persist(person);
        
        user.setPassw(PasswordUtils.hashPassword(activationRequestDTO.password()));
        user.setStatus_passw(User.PASSWORD_OK);
        user.setPass_token("");
        //userRepo.persist(user);
    }            
}
