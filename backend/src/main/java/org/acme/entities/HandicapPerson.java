package org.acme.entities;

import java.time.LocalDate;

public class HandicapPerson {
    private String cin;
    private Long id_hand;
    private String severity;
    private String assistive_devices;

    public HandicapPerson() {}

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Long getId_hand() {
        return id_hand;
    }

    public void setId_hand(Long id_hand) {
        this.id_hand = id_hand;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getAssistive_devices() {
        return assistive_devices;
    }

    public void setAssistive_devices(String assistive_devices) {
        this.assistive_devices = assistive_devices;
    }

}
