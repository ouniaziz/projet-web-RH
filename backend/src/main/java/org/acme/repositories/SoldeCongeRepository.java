package org.acme.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.SoldeCongeId;

import java.time.Year;
import java.util.List;

@ApplicationScoped
public class SoldeCongeRepository implements PanacheRepositoryBase<SoldeConge, SoldeCongeId> {
    public List<SoldeConge> findByCin(String cin, int demande_annee){
        return find("""
                    SELECT s
                    FROM SoldeConge s
                    WHERE s.id.cin = ?1 AND s.id.annee BETWEEN ?2 AND ?3 AND s.soldeRestant>0
                    ORDER BY id.annee ASC""", cin,  demande_annee - SoldeConge.PLAFOND_ANNEE, demande_annee).list();
    }
}
