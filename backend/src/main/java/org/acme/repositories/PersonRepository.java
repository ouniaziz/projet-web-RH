package org.acme.repositories;

import java.util.Optional;

import org.acme.DTO.PersonStatusDTO;
import org.acme.entities.Person;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonRepository implements PanacheRepositoryBase<Person, String>{
    
    public Optional<PersonStatusDTO> findStatusByEmail(String email){
        return find("email", email).project(PersonStatusDTO.class).firstResultOptional();
    }
}
