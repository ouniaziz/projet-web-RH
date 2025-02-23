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
    public static final int ADMIN_ID = 0;
    public static final String ADMIN_NAME = "Administrateur";
    
    public static final int RH_ID = 1;
    public static final String RH_NAME = "Personnel RH";
    
    public static final int ENSEIGNANT_ID = 2;
    public static final String ENSEIGNANT_NAME = "Enseignant";
    
    public static final int EMPLOYE_ID = 3;
    public static final String EMPLOYE_NAME = "Employé";
    
    public static final String[] ROLES = {ADMIN_NAME, RH_NAME, ENSEIGNANT_NAME, EMPLOYE_NAME};
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
