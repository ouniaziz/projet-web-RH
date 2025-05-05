package org.acme.entities.conge;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class JoursFeriersId {
    public String month;
    public String day;
    public String year;
    @Override
    public boolean equals(Object o) {
        if (!(o instanceof JoursFeriersId that)) return false;
        return Objects.equals(month, that.month) && Objects.equals(day, that.day) && Objects.equals(year,that.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(month, day, year);
    }
    public JoursFeriersId(){}
}
