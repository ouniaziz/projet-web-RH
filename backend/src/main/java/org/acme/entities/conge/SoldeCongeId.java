package org.acme.entities.conge;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SoldeCongeId implements Serializable{
    public int annee;
    public String cin;
    //public int type_id;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof SoldeCongeId that)) return false;
        return annee == that.annee && Objects.equals(cin, that.cin) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(annee, cin);
    }

    public SoldeCongeId() {
    }

    public SoldeCongeId(int annee, String cin) {
        this.annee = annee;
        this.cin = cin;
    }
}
