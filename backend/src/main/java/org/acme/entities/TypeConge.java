package org.acme.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class TypeConge extends PanacheEntityBase {
    @Id
    private int id;
    private String desc;

    public TypeConge() {}
    public int getId() {
        return id;
    }

    public String getDesc() {
        return desc;
    }
}
