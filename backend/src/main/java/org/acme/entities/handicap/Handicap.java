package org.acme.entities.handicap;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Handicap extends PanacheEntityBase{
    @Id
    @Column(name = "ID_HAND")
    private Long id_hand;
    
    private String name_h;
    
    private String desc_h;

    @OneToMany(mappedBy = "handicap")
    @JsonIgnore
    private List<HandicapPerson> people;
    public Handicap() {}

    public Long getId_hand() {
        return id_hand;
    }

    public void setId_hand(Long id_hand) {
        this.id_hand = id_hand;
    }

    public String getName_h() {
        return name_h;
    }

    public void setName_h(String name_h) {
        this.name_h = name_h;
    }

    public String getDesc_h() {
        return desc_h;
    }

    public void setDesc_h(String desc_h) {
        this.desc_h = desc_h;
    }

}
