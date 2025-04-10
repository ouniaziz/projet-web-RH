package org.acme.entities.conge;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import org.acme.dto.conge.PersonDTO;
import org.acme.entities.Exercice;
import org.acme.entities.Person;

import java.time.LocalDate;

@Entity
@Table(name = "demande_conge")
public class DemandeConge extends PanacheEntity {
    public static int DEMANDE_REFUSE=0;
    public static int DEMANDE_PENDING=-1;
    public static int DEMANDE_ACCEPTED=1;

    @Column(name = "date_debut")
    private LocalDate dateDebut;

    @Column(name = "date_fin")
    private LocalDate dateFin;

    @Column(name = "date_retour")
    private LocalDate dateRetour;
    private int duree;

    @Column(name="status_conge")
    private int statusConge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "person", referencedColumnName = "cin", insertable = false, updatable = false)
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "annee", insertable = false, updatable = false)
    private Exercice exercice;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private TypeConge type;

    @JsonIgnore
    public Person getPerson_(){
        return person;
    }

    public PersonDTO getPerson() {
        return person!=null?new PersonDTO(person.getCin(),person.getNom(), person.getPrenom()):null;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate date_debut) {
        this.dateDebut = date_debut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate date_fin) {
        this.dateFin = date_fin;
    }

    public LocalDate getDateRetour() {
        return dateRetour;
    }

    public void setDateRetour(LocalDate date_retour) {
        this.dateRetour = date_retour;
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

    public int getStatusConge() {
        return statusConge;
    }

    public void setStatusConge(int statusConge) {
        this.statusConge = statusConge;
    }

    public void setPerson(Person p){
        this.person = p;
    }

    public DemandeConge() {}

    public String getPersonCin() {
        if (this.person == null) return null;
        return this.person.getCin();
    }
}
