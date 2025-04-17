package org.acme.repositories;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.acme.dto.PersonStatusDTO;
import org.acme.dto.response.SimplePersonResponseDTO;
import org.acme.entities.Person;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.exceptions.EntityException.EntityException;

@ApplicationScoped
public class PersonRepository implements PanacheRepositoryBase<Person, String>{
    
    public Optional<PersonStatusDTO> findStatusByEmail(String email){
        return find("email", email).project(PersonStatusDTO.class).firstResultOptional();
    }
    public List<SimplePersonResponseDTO> findByRoles(Long... roles){
        return find("""
                SELECT
                    p.cin, p.nom, p.prenom, p.sexe, p.status_p, p.date_n, p.email, COALESCE(p.anciennete, 0),
                    p.role.nom_r,
                    COALESCE(
                          (SELECT gp.grad.nom_g
                          FROM p.gradList gp
                          ORDER BY gp.startDate DESC
                          LIMIT 1),
                          ''
                    ),
                    EXISTS(
                        SELECT 1
                        FROM p.handicaps
                    ),
                    p.image,
                    p.telephone,
                    p.adresse,
                    p.depart.nomDep
                FROM Person p
                WHERE p.role.id_r IN ?1
                """, List.of(roles))
                .project(SimplePersonResponseDTO.class)
                .list();
    }

    public List<SimplePersonResponseDTO> findByRole(Long role){
        return find("""
                SELECT
                    p.cin, p.nom, p.prenom, p.sexe, p.status_p, p.date_n, p.email, COALESCE(p.anciennete, 0),
                    p.role.nom_r,
                    COALESCE(
                          (SELECT gp.grad.nom_g
                          FROM p.gradList gp
                          ORDER BY gp.startDate DESC
                          LIMIT 1),
                          ''
                    ),
                    EXISTS(
                        SELECT 1
                        FROM p.handicaps
                    ),
                    p.image,
                    p.telephone,
                    p.adresse,
                    p.depart.nomDep
                FROM Person p
                WHERE p.role.id_r = ?1
                """, role).project(SimplePersonResponseDTO.class).list();
    }

    public void existsOrElseThrow(String cin){
        find("SELECT p.cin FROM Person p WHERE p.cin =?1", cin).firstResultOptional().orElseThrow(()->new EntityException("Person cin="+cin+" not found",404));
    }

    public void existsThrow(String cin){
        find("SELECT p.cin FROM Person p WHERE p.cin =?1", cin).firstResultOptional().ifPresent(p-> {
            throw new EntityException("Person cin=" + cin + " not found", 404);
        });
    }
}
