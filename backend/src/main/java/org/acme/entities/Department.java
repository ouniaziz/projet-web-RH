package org.acme.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Department extends PanacheEntityBase {
    @Id
    @Column(name = "id_dep")
    private String idDep;

    @Column(name = "nom_dep")
    private String nomDep;

    @OneToOne
    @JoinColumn(name = "chef_dep", referencedColumnName = "cin")
    private Person chefDep;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "depart")
    @JsonIgnore
    private List<Person> personList;

    public Department() {}


    public String getNomDep() {
        return nomDep;
    }

    public void setNomDep(String nom_dep) {
        this.nomDep = nom_dep;
    }

    public Person getChefDep() {
        return chefDep;
    }

    public void setChefDep(Person chef_dep) {
        this.chefDep = chef_dep;
    }

}
