package org.acme.entities;

import java.time.LocalDate;

public class HistoriqueConge {
    private Long id_hist;
    private Long id_conge;
    private String cin;
    private Integer duree;
    private LocalDate created_at;
    private String status_c;
    private String cin_validator;

    public HistoriqueConge() {}

    public Long getId_hist() {
        return id_hist;
    }

    public void setId_hist(Long id_hist) {
        this.id_hist = id_hist;
    }

    public Long getId_conge() {
        return id_conge;
    }

    public void setId_conge(Long id_conge) {
        this.id_conge = id_conge;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Integer getDuree() {
        return duree;
    }

    public void setDuree(Integer duree) {
        this.duree = duree;
    }

    public LocalDate getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDate created_at) {
        this.created_at = created_at;
    }

    public String getStatus_c() {
        return status_c;
    }

    public void setStatus_c(String status_c) {
        this.status_c = status_c;
    }

    public String getCin_validator() {
        return cin_validator;
    }

    public void setCin_validator(String cin_validator) {
        this.cin_validator = cin_validator;
    }

}
