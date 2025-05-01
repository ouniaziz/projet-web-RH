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

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
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

    public String getChefDepCin(){
        if(chefDep==null)
            return null;
        return chefDep.getCin();}
    public void setChefDep(Person chef_dep) {
        this.chefDep = chef_dep;
    }

}

/*
    TODO: REDUCE THIS DIPSHIT OF SELECT QUERY
*  SELECT
*
*       d1_0.id_dep, cd1_0.cin, cd1_0.adresse, cd1_0.anciennete, cd1_0.date_n,
*       d2_0.id_dep, d2_0.chef_dep, d2_0.nom_dep, dg1_0.id_dep, dg1_0.chef_dep,
*       dg1_0.nom_dep, cd1_0.email, cd1_0.emploi_de_temps, cd1_0.image, cd1_0.nom,
*       cd1_0.prenom, cd1_0.role_p, cd1_0.sexe, cd1_0.status_p, cd1_0.telephone, u1_0.cin,
*       u1_0.DEVICE_ID, u1_0.email, u1_0.pass_token, u1_0.PASSW_HASH, u1_0.status_passw, d1_0.nom_dep
*
*  FROM Department d1_0
*  LEFT JOIN Person cd1_0
*  ON cd1_0.cin=d1_0.chef_dep
*  LEFT JOIN Department d2_0
*  ON d2_0.id_dep=cd1_0.dep
*  LEFT JOIN Department dg1_0
*  ON dg1_0.id_dep=cd1_0.departGere_id_dep
*  LEFT JOIN USERS u1_0
*  ON cd1_0.cin=u1_0.cin
*  WHERE d1_0.id_dep = any (?)
* */