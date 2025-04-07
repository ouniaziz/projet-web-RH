package org.acme.repositories;

import java.util.List;
import java.util.Optional;

import org.acme.dto.PersonStatusDTO;
import org.acme.dto.response.SimplePersonResponseDTO;
import org.acme.entities.Person;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PersonRepository implements PanacheRepositoryBase<Person, String>{
    
    public Optional<PersonStatusDTO> findStatusByEmail(String email){
        return find("email", email).project(PersonStatusDTO.class).firstResultOptional();
    }

    public List<SimplePersonResponseDTO> findByRoles(int... roles){
        //TOD0: try NEW SimplePersonResponse, without package
        return find("SELECT p.cin, p.nom, p.prenom, p.sexe, p.dateN, p.status_p, p.anciennete, p.email, encode(p.image, 'base64') as image, r.nom_r role,"+
                            "(SELECT g.nom_h" +
                            "FROM GradPerson gp, Grad g" +
                            "WHERE gp.gradId = g.grad_id AND gp.id.cin=p.cin" +
                            "ORDER BY start DESC" +
                            "LIMIT 1) grad, "+
                        "EXISTS(" +
                            "SELECT 1" +
                            "FROM p.handicaps hp" +
                            "WHERE hp.id.cin = p.cin" +
                            "LIMIT 1) as hasHandicaps"+
                        "BOOL_OR(hp.id.HANDICAP_ID IS NOT NULL)" +
                        "FROM Person" +
                        "JOIN RolePerson r" +
                        "WHERE r.id_r = ANY(?1)", List.of(roles)).project(SimplePersonResponseDTO.class).list();
    }
}
