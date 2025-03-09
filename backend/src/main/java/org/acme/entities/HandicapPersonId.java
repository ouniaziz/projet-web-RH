package org.acme.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;


@Embeddable
public class HandicapPersonId implements Serializable {
    @Column(name = "HANDICAP_ID")
    private Long handicapId;
    
    @Column(name = "CIN")
    private String cin;

    public Long getHandicapId() {
        return handicapId;
    }

    public void setHandicapId(Long handicapId) {
        this.handicapId = handicapId;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public HandicapPersonId(Long handicapId, String cin) {
        this.handicapId = handicapId;
        this.cin = cin;
    }
    public HandicapPersonId(){}

    // Override equals and hashCode (required for composite keys)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HandicapPersonId that = (HandicapPersonId) o;
        return Objects.equals(handicapId, that.handicapId) &&
               Objects.equals(cin, that.cin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(handicapId, cin);
    }
}