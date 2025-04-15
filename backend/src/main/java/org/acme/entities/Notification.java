package org.acme.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Notification extends PanacheEntity {
    private String title;

    @Column(name = "description")
    private String desc;
    private String color;

    @JsonIgnore
    private String userId;

    @JsonIgnore
    private boolean isDelivered;
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean getIsDelivered() {
        return isDelivered;
    }

    public void setDelivered(boolean delivered) {
        isDelivered = delivered;
    }

    public Notification(){}

    public Notification(String title, String desc, String color, String userId) {
        this.title = title;
        this.desc = desc;
        this.color = color;
        this.userId = userId;
        isDelivered=false;
    }
}
