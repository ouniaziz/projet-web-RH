package org.acme.entities.conge;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import org.acme.entities.Person;

import java.time.LocalDate;

@Entity
//TODO: To implement this further
public class DemandeAjoutSolde extends PanacheEntity{
    @Column(name="justif")
    private String justification;

    @Column(name = "soldeAjoute")
    private Integer soldeAjoute;

    @Column(name = "date_creation")
    private LocalDate dateCreating;

    @ManyToOne
    private TypeConge type;

    @ManyToOne
    private Person person_cin;

    public DemandeAjoutSolde() {
    }

    public String getJustification() {
        return justification;
    }

    public void setJustification(String justification) {
        this.justification = justification;
    }

    public Integer getSoldeAjoute() {
        return soldeAjoute;
    }

    public void setSoldeAjoute(Integer soldeAjoute) {
        this.soldeAjoute = soldeAjoute;
    }

    public LocalDate getDateCreating() {
        return dateCreating;
    }

    public void setDateCreating(LocalDate dateCreating) {
        this.dateCreating = dateCreating;
    }

    public TypeConge getType() {
        return type;
    }

    public void setType(TypeConge type) {
        this.type = type;
    }

    public Person getPerson_cin() {
        return person_cin;
    }

    public void setPerson_cin(Person person_cin) {
        this.person_cin = person_cin;
    }
}
