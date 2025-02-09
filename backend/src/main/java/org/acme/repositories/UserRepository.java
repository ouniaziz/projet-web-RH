package org.acme.repositories;

import java.util.Optional;

import org.acme.entities.Users;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepository<Users>{
    public Optional<Users> findByEmailOrCin(String id){
        return find("lower(email) = ?1 or cin =?2", "lower("+id+")", id).firstResultOptional();
    }
}
