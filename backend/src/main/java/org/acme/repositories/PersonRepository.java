package org.acme.repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<Person> filterRecord(String sexe, int grad, int anciennete, int handicap, String actif){
        Map<String, Object> params = new HashMap<>();

        // Build the query dynamically
        StringBuilder query = new StringBuilder("FROM Person p where 1 = 1"); // Base condition to simplify chaining

        if (grad != -1) {
            query.append(" and p.grad.id_g = :grad");
            params.put("grad", grad);
        }
        if (sexe != null) {
            query.append(" and p.sexe = :sexe");
            params.put("sexe", sexe);
        }
        if (anciennete != -1) {
            query.append(" and p.anciennete = :anciennete");
            params.put("anciennete", anciennete);
        }
        if (actif!= null && (actif.equals("false") || actif.equals("true"))) {
            query.append(" and p.actif = :actif");
            params.put("actif", actif);
        }
        if (handicap != -1) {
            query.append(" and exists(select 1 from p.handicaps h where h.handicap.id_hand = :handicap)");
            params.put("handicap", handicap);
        }
        return find(query.toString(), params).list();
    }
}
