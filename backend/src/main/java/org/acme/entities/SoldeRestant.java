package org.acme.entities;

import java.time.LocalDate;

public class SoldeRestant {
    private String cin;
    private Long id_conge;
    private Integer solde_restant;

    public SoldeRestant() {}

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Long getId_conge() {
        return id_conge;
    }

    public void setId_conge(Long id_conge) {
        this.id_conge = id_conge;
    }

    public Integer getSolde_restant() {
        return solde_restant;
    }

    public void setSolde_restant(Integer solde_restant) {
        this.solde_restant = solde_restant;
    }

}
