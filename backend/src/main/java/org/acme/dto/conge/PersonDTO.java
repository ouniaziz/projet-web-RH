package org.acme.dto.conge;

import org.acme.entities.Person;

public class PersonDTO {
    public String cin;
    public String nom;
    public String prenom;

    public PersonDTO(Person p) {
        this.cin = p.getCin();
        this.nom = p.getNom();
        this.prenom = p.getPrenom();
    }
}
