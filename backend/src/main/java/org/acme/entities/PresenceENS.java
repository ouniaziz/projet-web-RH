package org.acme.entities;

import java.time.LocalDate;

public class PresenceENS {
    private Long id_presence_ens;
    private Long id_seance;
    private String present;
    private LocalDate date_presence;

    public PresenceENS() {}

    public Long getId_presence_ens() {
        return id_presence_ens;
    }

    public void setId_presence_ens(Long id_presence_ens) {
        this.id_presence_ens = id_presence_ens;
    }

    public Long getId_seance() {
        return id_seance;
    }

    public void setId_seance(Long id_seance) {
        this.id_seance = id_seance;
    }

    public String getPresent() {
        return present;
    }

    public void setPresent(String present) {
        this.present = present;
    }

    public LocalDate getDate_presence() {
        return date_presence;
    }

    public void setDate_presence(LocalDate date_presence) {
        this.date_presence = date_presence;
    }

}
