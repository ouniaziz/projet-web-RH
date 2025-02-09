package org.acme.entities;

import java.time.LocalDate;

public class Department {
    private Long id_depart;
    private String nom_dep;
    private String chef_dep;

    public Department() {}

    public Long getId_depart() {
        return id_depart;
    }

    public void setId_depart(Long id_depart) {
        this.id_depart = id_depart;
    }

    public String getNom_dep() {
        return nom_dep;
    }

    public void setNom_dep(String nom_dep) {
        this.nom_dep = nom_dep;
    }

    public String getChef_dep() {
        return chef_dep;
    }

    public void setChef_dep(String chef_dep) {
        this.chef_dep = chef_dep;
    }

}
