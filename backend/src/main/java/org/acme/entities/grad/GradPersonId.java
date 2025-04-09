package org.acme.entities.grad;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import org.acme.entities.Person;

import java.io.Serializable;
import java.util.Objects;


public class GradPersonId implements Serializable {
    private Grad grad;

    private Person person;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof GradPersonId that)) return false;
        return Objects.equals(grad, that.grad) && Objects.equals(person, that.person);
    }

    @Override
    public int hashCode() {
        return Objects.hash(grad, person);
    }

    public GradPersonId() {
    }

    public Grad getGrad() {
        return grad;
    }

    public void setGrad(Grad grad) {
        this.grad = grad;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
}
