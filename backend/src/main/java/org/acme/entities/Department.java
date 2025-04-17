package org.acme.entities;

import io.quarkus.hibernate.orm.panache.Panache;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDate;

@Entity
public class Department extends PanacheEntity {
    @Column(name = "nom_dep")
    private String nomDep;

    @Column(name = "chef_dep")
    private String chefDep;

    public Department() {}

    public String getNom_dep() {
        return nomDep;
    }

    public void setNom_dep(String nom_dep) {
        this.nomDep = nom_dep;
    }

    public String getChef_dep() {
        return chefDep;
    }

    public void setChef_dep(String chef_dep) {
        this.chefDep = chef_dep;
    }

}
