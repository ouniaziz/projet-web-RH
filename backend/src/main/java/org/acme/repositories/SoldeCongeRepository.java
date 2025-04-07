package org.acme.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.SoldeCongeId;

import java.time.Year;
import java.util.List;

@ApplicationScoped
public class SoldeCongeRepository implements PanacheRepositoryBase<SoldeConge, SoldeCongeId> {
    public List<SoldeConge> findByCin(String cin){
        var current_year =Year.now().getValue();
        return find("id.cin = ?1 AND id.annee BETWEEN ?2 AND ?3 AND solde_restant>0 ORDER BY id.annee ASC", cin, current_year, current_year - SoldeConge.PLAFOND_ANNEE).list();
    }
}
