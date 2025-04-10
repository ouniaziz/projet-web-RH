package org.acme.entities.conge;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import org.acme.dto.conge.TypeCongeDTO;

import java.util.List;

@Entity(name = "type_conge")
public class TypeConge extends PanacheEntityBase {
    public static int ID_CONGE_ANNUELLE = 0;


    @Id
    private int id;
    private String nom;
    private int solde_initial;

    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
    private List<DemandeConge> demandes;

    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
    private List<Conge> conges;


    public TypeConge() {}
    public TypeConge(TypeCongeDTO dto){
        id = dto.id;
        nom = dto.nom;
        solde_initial = dto.solde_initial;
    }
    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }
    public int getSold_initial() {
        return solde_initial;
    }
}
