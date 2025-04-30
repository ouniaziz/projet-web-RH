package org.acme.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.grad.GradPerson;
import org.acme.entities.handicap.HandicapPerson;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;


@Entity
//TODO: Make getSimplified PErson record for profile
// TODO: The profile needs to include name of handicap, severiy then devices instead of exhaustive JSON response
public class Person extends PanacheEntityBase{
    public static int STATUS_PERSON_ARCHIVED = -1;
    public static int STATUS_PERSON_INACTIVE = 0;
    public static int STATUS_PERSON_ACTIVE = 1;

    @Id
    @Column(length = 8)
    private String cin;
    private String nom;
    private String prenom;
    private String sexe;
    private LocalDate date_n;
    private Integer status_p;
    private Integer anciennete;
    private String adresse;
    private String telephone;

    @Column(unique = true)
    private String email;

    @OneToOne(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="role_p", referencedColumnName = "id_r")
    private RolePerson role;
    
    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("startDate DESC") // This fetches them from newer to older grads
    private List<GradPerson> gradList= new ArrayList<>();

    @OneToMany(mappedBy = "person", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<HandicapPerson> handicaps= new ArrayList<>();

    @OneToMany(mappedBy = "person", orphanRemoval = true, fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Conge> conges= new ArrayList<>();

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<DemandeConge> demandes= new ArrayList<>();

    @OneToMany(mappedBy = "person", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SoldeConge> soldeList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "dep", referencedColumnName = "id_dep")
    private Department depart;

    @OneToOne
    private Department departGere;

    @Lob
    @Column(columnDefinition = "BYTEA")
    @JdbcTypeCode(SqlTypes.BINARY)
    private byte[] image;

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
        if(image == null)
            return null;
        return Base64.getEncoder().encodeToString(image);
    }

    public void setImage(byte[] img){image = img;}

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

    public String getCurrentGrad(){
        return gradList.isEmpty()?null:gradList.get(0).getGrad().getNom();
    }

    public void setHandicaps(List<HandicapPerson> handList){
        this.handicaps = handList;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Department getDepart() {
        return depart;
    }

    public void setDepart(Department depart) {
        this.depart = depart;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getAdresse() {
        return adresse;
    }
}
