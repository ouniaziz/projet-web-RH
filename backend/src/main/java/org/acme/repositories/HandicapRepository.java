package org.acme.repositories;

import org.acme.entities.handicap.Handicap;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HandicapRepository implements PanacheRepository<Handicap>{
    
}
