package org.acme.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class Person {
    @Id
    @Column(length = 8)
    private String cin;

    @OneToOne(mappedBy = "person")
    private User user;

    private String nom;
    private String prenom;
    private String sexe;
    private LocalDate date_n;
    
    @Column(unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name="role_p", referencedColumnName = "id_r")
    private RolePerson role;
    private Long grad;
    private Integer status_p;

    public Person() {}

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public RolePerson getRole() {
        return role;
    }

    public void setRole(RolePerson role_p) {
        this.role = role_p;
    }

    public Integer getStatus_p() {
        return status_p;
    }

    public void setStatus_p(Integer status_p) {
        this.status_p = status_p;
    }

    public Long getGrad() {
        return grad;
    }

    public void setGrad(Long grad) {
        this.grad = grad;
    }

    public LocalDate getDate_n() {
        return date_n;
    }

    public void setDate_n(LocalDate date_n) {
        this.date_n = date_n;
    }

}
