package org.acme.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.DTO.Conge.PersonDTO;

import java.time.LocalDate;

@Entity
@Table(name = "demande_conge")
public class DemandeConge extends PanacheEntityBase {
    @Id
    private int id;
    private LocalDate date_debut;
    private LocalDate date_fin;
    private LocalDate date_retour;
    private int duree;

    @ManyToOne
    @JoinColumn(name = "person", referencedColumnName = "cin")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "annee")
    private Exercice exercice;

    @ManyToOne
    @JoinColumn(name = "id")
    private TypeConge type;

    public PersonDTO getPerson() {
        return new PersonDTO(person);
    }

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

    public DemandeConge() {}
}
