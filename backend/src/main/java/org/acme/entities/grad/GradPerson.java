package org.acme.entities.grad;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Person;

import java.time.LocalDate;

@Entity
@Table(name = "grad_person")
@IdClass(GradPersonId.class)
public class GradPerson extends PanacheEntityBase {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore // replace with @JsonManagedReference and BackReference if you need both directions
    @JoinColumn
    private Person person;


    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Grad grad;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;



    public GradPerson() {

    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }


    public LocalDate getStart() {
        return startDate;
    }

    public void setStart(LocalDate start) {
        this.startDate = start;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Grad getGrad(){return this.grad;}

    public void setGrad(Grad gradEntity) {
        this.grad = gradEntity;
    }
}
