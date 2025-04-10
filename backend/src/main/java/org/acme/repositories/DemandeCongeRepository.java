package org.acme.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entities.conge.DemandeConge;

import java.util.Optional;

@ApplicationScoped
public class DemandeCongeRepository implements PanacheRepository<DemandeConge> {
    public Optional<DemandeConge> findByIdOptimized(Long id){
        return find("""
                SELECT d
                FROM DemandeConge d
                LEFT JOIN FETCH d.person
                LEFT JOIN FETCH d.exercice
                LEFT JOIN FETCH d.type
                WHERE d.id= ?1
                """, id).singleResultOptional();
    }
}
