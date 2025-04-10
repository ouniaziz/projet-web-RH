package org.acme.entities.conge;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Exercice;
import org.acme.entities.Person;

@Entity
@Table(name = "solde_conge")
public class SoldeConge extends PanacheEntityBase {
    public static int PLAFOND_ANNEE = 2;
    public static double HEURE_SUPP_TO_CONGES = 0.5; // conges = heures_supp * HEURE_SUPP_TO_CONGES


    @Id
    private SoldeCongeId id;

    @Column(name = "solde_restant")
    private int soldeRestant;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("cin")
    @JsonIgnore
    @JoinColumn(name = "cin", insertable = false, updatable = false)
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("annee")
    @JsonIgnore
    @JoinColumn(name="annee", insertable = false, updatable = false)
    private Exercice exercice;

    public void setExercice(Exercice exercice) {
        this.exercice = exercice;
    }

    public SoldeConge() {
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Exercice getExercice() {
        return exercice;
    }

    public SoldeConge(SoldeCongeId id, int solde_restant) {
        this.id = id;
        this.soldeRestant = solde_restant;
    }

    public SoldeCongeId getId() {
        return id;
    }

    public int getSoldeRestant() {
        return soldeRestant;
    }


    public void setSoldeRestant(int solde_restant) {
        this.soldeRestant = solde_restant;
    }
}
