package org.acme.repositories;

import org.acme.entities.GradEns;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class GradRepository implements PanacheRepository<GradEns> {
    
}
