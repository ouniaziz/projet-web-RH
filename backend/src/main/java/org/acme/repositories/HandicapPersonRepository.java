package org.acme.repositories;

import java.util.Optional;

import org.acme.entities.handicap.HandicapPerson;
import org.acme.entities.handicap.HandicapPersonId;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HandicapPersonRepository implements PanacheRepositoryBase<HandicapPerson, HandicapPersonId>{
    
    public Optional<HandicapPerson> findByIdOptional(String cin, int handicap_id){
        return findByIdOptional(new HandicapPersonId((long)handicap_id, cin));
    }
}
