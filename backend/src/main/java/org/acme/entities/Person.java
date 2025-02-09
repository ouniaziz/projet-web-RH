package org.acme.entities;

import java.time.LocalDate;

import org.acme.DTO.PersonDTO;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Person extends PanacheEntityBase{
    @Id
    @Column(length = 8)
    private String cin;

    @OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
    private Users user;

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

    public Person(PersonDTO personDTO, RolePerson role) {
        this.cin = personDTO.cin;
        
        this.nom = personDTO.nom;
        this.prenom = personDTO.prenom;
        this.sexe = personDTO.sexe;
        this.date_n = personDTO.dateN;
        this.email = personDTO.email;
        this.role = role;
        this.grad = personDTO.grad;
        this.status_p = personDTO.statusP;
    }

    
}
