package org.acme.repositories;

import org.acme.entities.RolePerson;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RolesRepository implements PanacheRepository<RolePerson>{
    
}
