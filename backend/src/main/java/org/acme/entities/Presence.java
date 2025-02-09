package org.acme.entities;

import java.time.LocalDate;

public class Presence {
    private String id_emp;
    private LocalDate date_p;
    private String est_present;

    public Presence() {}

    public String getId_emp() {
        return id_emp;
    }

    public void setId_emp(String id_emp) {
        this.id_emp = id_emp;
    }

    public LocalDate getDate_p() {
        return date_p;
    }

    public void setDate_p(LocalDate date_p) {
        this.date_p = date_p;
    }

    public String getEst_present() {
        return est_present;
    }

    public void setEst_present(String est_present) {
        this.est_present = est_present;
    }

}
