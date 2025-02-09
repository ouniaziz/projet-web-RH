package org.acme.DTO;

import java.time.LocalDate;

public class PersonDTO {
    public String cin;
    public String nom;
    public String prenom;
    public String sexe;
    public LocalDate dateN;
    public String email;
    public Long roleId;  // RolePerson ID
    public Long grad;
    public Integer statusP;
    
    public PersonDTO(String cin, String nom, String prenom, String sexe, LocalDate dateN, String email, Long roleId,
            Long grad, Integer statusP) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.dateN = dateN;
        this.email = email;
        this.roleId = roleId;
        this.grad = grad;
        this.statusP = statusP;
    }

    
}
