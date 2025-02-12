package org.acme.services;

import org.acme.DTO.ActivationRequestDTO;
import org.acme.entities.Person;
import org.acme.entities.User;
import org.acme.exceptions.ActivationFailedExceptions.ActivationFailedException;
import org.acme.exceptions.PersonExceptions.PersonException;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.UserRepository;

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
import jakarta.transaction.Transactional;


@ApplicationScoped
public class CustomAuthService implements IdentityProvider<UsernamePasswordAuthenticationRequest>{

    @Inject UserRepository userRepo;
    @Inject PersonRepository personRepo;
    @Inject JwtService jwtService;
    @Override
    public Class<UsernamePasswordAuthenticationRequest> getRequestType() {
        return UsernamePasswordAuthenticationRequest.class;
    }

    @Override
    public Uni<SecurityIdentity> authenticate(UsernamePasswordAuthenticationRequest request,
            AuthenticationRequestContext context) {
        
                User user = userRepo.findByEmailOrCin(request.getUsername())
                        .orElseThrow(()-> new AuthenticationFailedException("invalid email or cin"));
                
                if(!PasswordUtils.checkPassword(String.valueOf(request.getPassword().getPassword()), user.getPassw()))
                    throw new AuthenticationFailedException("Invalid password");
                
                Person pers = personRepo.findByIdOptional(user.getCin())
                            .orElseThrow(()-> new AuthenticationFailedException("User not found"));

                return Uni.createFrom().item(
                    QuarkusSecurityIdentity.builder()
                    .setPrincipal(new QuarkusPrincipal(pers.getCin()))
                    .addRole(pers.getRole().getNom_r())
                    .addCredential(request.getPassword())
                    .setAnonymous(false)
                    .build()
                );
    }
    
    @Transactional
    public void activate(ActivationRequestDTO activationRequestDTO){
        User user = userRepo.findByIdOptional(activationRequestDTO.cin()).orElseThrow(()->new PersonException("user cin="+activationRequestDTO.cin()+" not found", 404));
        if(user.getStatus_passw()==1)
            throw new ActivationFailedException("user "+activationRequestDTO.cin()+" already activated", 409);
        else if(user.getPass_token() ==null || user.getPass_token().isEmpty())
            throw new ActivationFailedException("activation token not found", 404);
        else if(!PasswordUtils.checkPassword(activationRequestDTO.token(), user.getPass_token()))
            throw new ActivationFailedException("wrong activation token", 401);
        
        if(jwtService.isTokenExpired(activationRequestDTO.token()))
            throw new ActivationFailedException("Provided token is invalid", 401);

        Person person = personRepo.findByIdOptional(activationRequestDTO.cin()).orElseThrow(()-> new PersonException("Person cin="+activationRequestDTO.cin()+ " not found", 404));
        
        // perform activation
        person.setStatus_p(1);
        //personRepo.persist(person);
        
        user.setPassw(PasswordUtils.hashPassword(activationRequestDTO.password()));
        user.setStatus_passw(1);
        user.setPass_token("");
        //userRepo.persist(user);
    }            
}
