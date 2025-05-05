package org.acme.entities.conge;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Exercice;
import org.acme.entities.Person;

@Entity
@Table(name = "solde_conge")
public class SoldeConge extends PanacheEntityBase {
    public static double HEURE_SUPP_TO_CONGES = 0.5; // conges = heures_supp * HEURE_SUPP_TO_CONGES


    @Id
    @JsonIgnore
    private SoldeCongeId id;

    @Column(name = "solde_restant")
    private Integer soldeRestant;

    @Column(name = "solde_compensatoir")
    private Integer soldeCompRestant;

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

    public SoldeConge(SoldeCongeId id, Integer solde_restant, Integer soldeCompRestant) {
        this.id = id;
        this.soldeRestant = solde_restant;
        this.soldeCompRestant = soldeCompRestant;
    }

    public SoldeCongeId getId() {
        return id;
    }

    public Integer getSoldeRestant() {
        return soldeRestant;
    }


    public void setSoldeRestant(Integer solde_restant) {
        this.soldeRestant = solde_restant;
    }

    public Integer getSoldeCompRestant() {
        return soldeCompRestant;
    }

    public void setSoldeCompRestant(Integer soldeCompRestant) {
        this.soldeCompRestant = soldeCompRestant;
    }
}
