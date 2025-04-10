package org.acme.entities.conge;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.dto.conge.PersonDTO;
import org.acme.entities.Exercice;
import org.acme.entities.Person;

import java.time.LocalDate;

@Entity
public class Conge extends PanacheEntityBase {
    @Id
    @GeneratedValue
    private int id;
    private LocalDate date_debut;
    private LocalDate date_fin;
    private LocalDate date_retour;
    private int duree;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person", referencedColumnName = "cin")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "annee")
    private Exercice exercice;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeConge type;


    public LocalDate getDateDebut() {
        return date_debut;
    }

    public void setDateDebut(LocalDate date_debut) {
        this.date_debut = date_debut;
    }

    public LocalDate getDateFin() {
        return date_fin;
    }

    public void setDateFin(LocalDate date_fin) {
        this.date_fin = date_fin;
    }

    public LocalDate getDateRetour() {
        return date_retour;
    }

    public void setDateRetour(LocalDate date_retour) {
        this.date_retour = date_retour;
    }

    public int getDuree() {
        return duree;
    }

    public void setDuree(int duree) {
        this.duree = duree;
    }

    public Exercice getExercice() {
        return exercice;
    }

    public void setExercice(Exercice exercice) {
        this.exercice = exercice;
    }

    public TypeConge getType() {
        return type;
    }

    public void setType(TypeConge type) {
        this.type = type;
    }

    public Conge() {}
    public Conge(DemandeConge demande){
        this.date_debut = demande.getDateDebut();
        this.date_fin = demande.getDateFin();
        this.date_retour = demande.getDateRetour();
        this.duree = demande.getDuree();
        this.exercice = demande.getExercice();
        this.type = demande.getType();
        this.person =Person.getEntityManager().getReference(Person.class, demande.getPersonCin());

    }
}
