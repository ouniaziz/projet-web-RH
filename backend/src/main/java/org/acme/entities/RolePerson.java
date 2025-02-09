package org.acme.entities;


import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Role_Person")
public class RolePerson extends PanacheEntityBase{
    @Id
    private Long id_r;
    private String nom_r;

    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
    private List<Person> persons;
    public RolePerson() {}

    public Long getId_r() {
        return id_r;
    }

    public void setId_r(Long id_r) {
        this.id_r = id_r;
    }

    public String getNom_r() {
        return nom_r;
    }

    public void setNom_r(String nom_r) {
        this.nom_r = nom_r;
    }

}
