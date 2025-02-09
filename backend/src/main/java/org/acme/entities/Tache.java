package org.acme.entities;

import java.time.LocalDate;

public class Tache {
    private Long id_tache;
    private String nom_tache;
    private String desc_tache;
    private String status_t;
    private LocalDate created_t;
    private LocalDate deadline_t;
    private String priority_t;
    private String id_p;

    public Tache() {}

    public Long getId_tache() {
        return id_tache;
    }

    public void setId_tache(Long id_tache) {
        this.id_tache = id_tache;
    }

    public String getNom_tache() {
        return nom_tache;
    }

    public void setNom_tache(String nom_tache) {
        this.nom_tache = nom_tache;
    }

    public String getDesc_tache() {
        return desc_tache;
    }

    public void setDesc_tache(String desc_tache) {
        this.desc_tache = desc_tache;
    }

    public String getStatus_t() {
        return status_t;
    }

    public void setStatus_t(String status_t) {
        this.status_t = status_t;
    }

    public LocalDate getCreated_t() {
        return created_t;
    }

    public void setCreated_t(LocalDate created_t) {
        this.created_t = created_t;
    }

    public LocalDate getDeadline_t() {
        return deadline_t;
    }

    public void setDeadline_t(LocalDate deadline_t) {
        this.deadline_t = deadline_t;
    }

    public String getPriority_t() {
        return priority_t;
    }

    public void setPriority_t(String priority_t) {
        this.priority_t = priority_t;
    }

    public String getId_p() {
        return id_p;
    }

    public void setId_p(String id_p) {
        this.id_p = id_p;
    }

}
