package org.acme.repositories;

import java.util.Optional;

import org.acme.entities.User;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<User,String>{
    public Optional<User> findByEmailOrCin(String id){
        return find("lower(email) = ?1 or cin =?2", "lower("+id+")", id).firstResultOptional();
    }
    public Optional<User> findByEmail(String email){
        return find("lower(email) =?1", email).firstResultOptional();
    }
}
