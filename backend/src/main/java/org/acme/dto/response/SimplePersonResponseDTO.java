package org.acme.dto.response;



import java.time.LocalDate;
import java.util.Base64;

public class SimplePersonResponseDTO {
    public final String cin;
    public final String nom;
    public final String prenom;
    public final String sexe;
    public final Integer status;
    public final LocalDate dateN;
    public final String email;
    public final Integer anciennete;
    public final String role;
    public final String grad;
    public final Boolean hasHandicaps;
    public final String image;
    public final String telephone;
    public final String adresse;
    public final String departement;
    public SimplePersonResponseDTO(String cin, String nom, String prenom, String sexe, Integer status, LocalDate dateN, String email, Integer anciennete, String role, String grad, Boolean hasHandicaps, byte[] image, String telephone, String adresse, String dep) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.status = status;
        this.dateN = dateN;
        this.email = email;
        this.anciennete = anciennete;
        this.role = role;
        this.grad = grad;
        this.hasHandicaps = hasHandicaps;
        this.image = image!=null?Base64.getEncoder().encodeToString(image):null;
        this.telephone = telephone;
        this.adresse = adresse;
        departement = dep;
    }
}