package org.acme.entities;

import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.grad.GradPerson;
import org.acme.entities.handicap.HandicapPerson;


@Entity
public class Person extends PanacheEntityBase{
    public static int STATUS_PERSON_ARCHIVED = -1;
    public static int STATUS_PERSON_INACTIVE = 0;
    public static int STATUS_PERSON_ACTIVE = 1;

    @Id
    @Column(length = 8)
    private String cin;

    @OneToOne(mappedBy = "person")
    private User user;

    private String nom;
    private String prenom;
    private String sexe;
    private LocalDate date_n;
    private Integer status_p;
    private Integer anciennete;
    
    @Lob @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    @Column(name = "image", columnDefinition = "BYTEA")
    private byte[] ignoredImage;

    @Column(unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name="role_p", referencedColumnName = "id_r")
    private RolePerson role;
    
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @OrderBy("start DESC")
    private List<GradPerson> gradList;

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HandicapPerson> handicaps;

    @OneToMany(mappedBy = "person")
    private List<Conge> conges;

    @OneToMany(mappedBy = "person")
    private List<DemandeConge> demandes;

    @OneToMany(mappedBy = "person", orphanRemoval = true)
    private List<SoldeConge> soldeList;

    public Person() {}
    
    public Integer getAnciennete() {
        return anciennete;
    }

    public void setAnciennete(Integer anciennete) {
        this.anciennete = anciennete;
    }

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

    public Integer getStatus() {
        return status_p;
    }
    public void setStatus_p(Integer status_p) {
        this.status_p = status_p;
    }

    public LocalDate getDate_n() {
        return date_n;
    }
    public void setDate_n(LocalDate date_n) {
        this.date_n = date_n;
    }

    public String getImage(){
        if(ignoredImage == null)
            return null;
        return Base64.getEncoder().encodeToString(ignoredImage);
    }

    public void setImage(byte[] img){ignoredImage = img;}

    public List<SoldeConge> getSoldeList() {
        return soldeList;
    }

    public void setSoldeList(List<SoldeConge> soldeList) {
        this.soldeList = soldeList;
    }


    public List<HandicapPerson> getHandicaps(){return handicaps;}
    
    public List<GradPerson> getGradList(){return gradList;}

    public void setGradList(List<GradPerson> gradList) {
        this.gradList = gradList;
    }

    public void setGrad(List<GradPerson> gradList){this.gradList = gradList;}
}
