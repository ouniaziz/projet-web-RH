package org.acme.entities.grad;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Person;

import java.time.LocalDate;

@Entity(name = "grad_person")
public class GradPerson extends PanacheEntityBase {
    @EmbeddedId
    private GradPersonId id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @MapsId("cin")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", referencedColumnName = "cin")
    private Person person;

    @MapsId("gradId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grad", referencedColumnName = "grad_id")
    private Grad grad;

    public GradPerson(GradPersonId id) {
        this.id = id;
    }

    public GradPerson() {

    }

    public GradPersonId getId() {
        return id;
    }

    public void setId(GradPersonId id) {
        this.id = id;
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
