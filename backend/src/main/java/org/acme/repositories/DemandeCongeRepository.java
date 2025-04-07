package org.acme.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entities.conge.DemandeConge;

@ApplicationScoped
public class DemandeCongeRepository implements PanacheRepository<DemandeConge> {
}
