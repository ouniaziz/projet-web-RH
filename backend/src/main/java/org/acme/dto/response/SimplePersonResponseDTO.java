package org.acme.dto.response;

import org.acme.entities.grad.GradPerson;

import java.time.LocalDate;
import java.util.List;

public class SimplePersonResponseDTO {
    public String cin;
    public String nom;
    public String prenom;
    public String sexe;
    public LocalDate dateN;
    public int status;
    public int anciennete;
    public String email;
    public String image;
    public String role;
    public String grad; // current grad
    public boolean hasHandicap;

    public SimplePersonResponseDTO(String cin, String nom, String prenom, String sexe, LocalDate dateN, int status, int anciennete, String email, String image, String role, String grad, boolean hasHandicap) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.dateN = dateN;
        this.status = status;
        this.anciennete = anciennete;
        this.email = email;
        this.image = image;
        this.role = role;
        this.grad = grad;
        this.hasHandicap = hasHandicap;
    }
}
