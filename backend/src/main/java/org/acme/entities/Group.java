package org.acme.entities;

import java.time.LocalDate;

public class Group {
    private String id_niv;
    private Integer year;
    private String id_sp;

    public Group() {}

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

}
