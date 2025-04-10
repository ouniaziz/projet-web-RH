package org.acme.dto.conge;

import org.acme.entities.Person;

public class PersonDTO {
    public String cin;
    public String nom;
    public String prenom;

    public PersonDTO(String cin, String nom, String prenom) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
    }
}
