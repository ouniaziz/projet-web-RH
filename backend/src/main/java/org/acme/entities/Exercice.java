package org.acme.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.SoldeConge;

import java.util.List;

@Entity
public class Exercice extends PanacheEntityBase {
    @Id
    private int annee;

    @OneToMany(mappedBy = "exercice")
    private List<Conge> congeList;

    @OneToMany(mappedBy = "exercice")
    private List<SoldeConge> soldeCongeList;

    @OneToMany(mappedBy = "exercice")
    private List<DemandeConge> demandeList;

    public Exercice() {}
    public int getAnnee() {
        return annee;
    }
    public void setAnnee(int an){this.annee=an;}
}
