package org.acme.entities.grad;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Person;

@Entity
public class Grad extends PanacheEntityBase{
    @Id
    @Column(name = "grad_id")
    private Long gradId;

    private String nom_g;

    @OneToMany(mappedBy = "grad")
    private List<GradPerson> gradPeople;

    public Grad() {}

    public Long getId() {
        return gradId;
    }

    public void setId(Long id_g) {
        this.gradId = id_g;
    }

    public String getNom() {
        return nom_g;
    }

    public void setNom_g(String nom_g) {
        this.nom_g = nom_g;
    }
}
