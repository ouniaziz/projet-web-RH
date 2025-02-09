package org.acme.entities;

import java.time.LocalDate;

public class Conge {
    private Long id_conge;
    private String desc_conge;
    private Integer solde_init;

    public Conge() {}

    public Long getId_conge() {
        return id_conge;
    }

    public void setId_conge(Long id_conge) {
        this.id_conge = id_conge;
    }

    public String getDesc_conge() {
        return desc_conge;
    }

    public void setDesc_conge(String desc_conge) {
        this.desc_conge = desc_conge;
    }

    public Integer getSolde_init() {
        return solde_init;
    }

    public void setSolde_init(Integer solde_init) {
        this.solde_init = solde_init;
    }

}
