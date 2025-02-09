package org.acme.entities;

import java.time.LocalDate;

public class Seance {
    private Long id_seance;
    private String id_ens;
    private String id_mat;
    private String id_salle;
    private String id_niv;
    private Integer year;
    private String id_sp;
    private LocalDate date_deb_s;
    private LocalDate date_deb_f;

    public Seance() {}

    public Long getId_seance() {
        return id_seance;
    }

    public void setId_seance(Long id_seance) {
        this.id_seance = id_seance;
    }

    public String getId_ens() {
        return id_ens;
    }

    public void setId_ens(String id_ens) {
        this.id_ens = id_ens;
    }

    public String getId_mat() {
        return id_mat;
    }

    public void setId_mat(String id_mat) {
        this.id_mat = id_mat;
    }

    public String getId_salle() {
        return id_salle;
    }

    public void setId_salle(String id_salle) {
        this.id_salle = id_salle;
    }

    public String getId_niv() {
        return id_niv;
    }

    public void setId_niv(String id_niv) {
        this.id_niv = id_niv;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getId_sp() {
        return id_sp;
    }

    public void setId_sp(String id_sp) {
        this.id_sp = id_sp;
    }

    public LocalDate getDate_deb_s() {
        return date_deb_s;
    }

    public void setDate_deb_s(LocalDate date_deb_s) {
        this.date_deb_s = date_deb_s;
    }

    public LocalDate getDate_deb_f() {
        return date_deb_f;
    }

    public void setDate_deb_f(LocalDate date_deb_f) {
        this.date_deb_f = date_deb_f;
    }

}
