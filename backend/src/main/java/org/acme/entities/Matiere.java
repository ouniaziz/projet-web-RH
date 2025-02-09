package org.acme.entities;

import java.time.LocalDate;

public class Matiere {
    private String id_mat;
    private String nom_mat;
    private String type_mat;
    private Boolean presentiel;

    public Matiere() {}

    public String getId_mat() {
        return id_mat;
    }

    public void setId_mat(String id_mat) {
        this.id_mat = id_mat;
    }

    public String getNom_mat() {
        return nom_mat;
    }

    public void setNom_mat(String nom_mat) {
        this.nom_mat = nom_mat;
    }

    public String getType_mat() {
        return type_mat;
    }

    public void setType_mat(String type_mat) {
        this.type_mat = type_mat;
    }

    public Boolean getPresentiel() {
        return presentiel;
    }

    public void setPresentiel(Boolean presentiel) {
        this.presentiel = presentiel;
    }

}
