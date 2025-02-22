package org.acme.entities;

import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class GradEns extends PanacheEntityBase{
    @Id
    private Long id_g;
    private String nom_g;

    @OneToMany(mappedBy = "grad")
    private List<Person> people;

    public GradEns() {}

    public Long getId_g() {
        return id_g;
    }

    public void setId_g(Long id_g) {
        this.id_g = id_g;
    }

    public String getNom_g() {
        return nom_g;
    }

    public void setNom_g(String nom_g) {
        this.nom_g = nom_g;
    }

}
