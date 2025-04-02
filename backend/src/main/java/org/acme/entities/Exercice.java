package org.acme.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Exercice extends PanacheEntityBase {
    @Id
    private int annee;

    public Exercice() {}
    public int getAnnee() {
        return annee;
    }
}
