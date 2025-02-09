package org.acme.services;

import org.acme.entities.Person;
import org.acme.entities.User;
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


@ApplicationScoped
public class CustomAuthService implements IdentityProvider<UsernamePasswordAuthenticationRequest>{

    @Inject UserRepository userRepo;
    @Inject PersonRepository personRepo;

    @Override
    public Class<UsernamePasswordAuthenticationRequest> getRequestType() {
        return UsernamePasswordAuthenticationRequest.class;
    }

    @Override
    public Uni<SecurityIdentity> authenticate(UsernamePasswordAuthenticationRequest request,
            AuthenticationRequestContext context) {
        
                User user = userRepo.findByEmailOrCin(request.getUsername())
                        .orElseThrow(()-> new AuthenticationFailedException("invalid email or cin"));
                
                String hash = PasswordUtils.hashPassword(String.valueOf(request.getPassword().getPassword()));
                
                if(!PasswordUtils.checkPassword(hash, user.getPassw()))
                    throw new AuthenticationFailedException("Invalid password");
                
                Person pers = personRepo.findByIdOptional(user.getCin())
                            .orElseThrow(()-> new AuthenticationFailedException("User not found"));

                return Uni.createFrom().item(
                    QuarkusSecurityIdentity.builder()
                    .setPrincipal(new QuarkusPrincipal(request.getUsername()))
                    .addRole(pers.getRole().getNom_r())
                    .addCredential(request.getPassword())
                    .setAnonymous(false)
                    .build()
                );
    }
    
}
