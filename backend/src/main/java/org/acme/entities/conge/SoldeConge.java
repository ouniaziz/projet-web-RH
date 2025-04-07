package org.acme.entities.conge;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Exercice;
import org.acme.entities.Person;

@Entity(name = "sold_conge")
public class SoldeConge extends PanacheEntityBase {
    public static int PLAFOND_ANNEE = 2;
    public static double HEURE_SUPP_TO_CONGES = 0.5; // conges = heures_supp * HEURE_SUPP_TO_CONGES


    @EmbeddedId
    private SoldeCongeId id;
    private int solde_restant;

    @ManyToOne
    @MapsId("cin")
    @JoinColumn(name = "cin")
    private Person person;

    @ManyToOne
    @MapsId("annee")
    @JoinColumn(name="annee")
    private Exercice exercice;


    public SoldeConge() {
    }

    public SoldeConge(SoldeCongeId id, int solde_restant) {
        this.id = id;
        this.solde_restant = solde_restant;
    }

    public SoldeCongeId getId() {
        return id;
    }

    public int getSoldeRestant() {
        return solde_restant;
    }


    public void setSoldeRestant(int solde_restant) {
        this.solde_restant = solde_restant;
    }
}
