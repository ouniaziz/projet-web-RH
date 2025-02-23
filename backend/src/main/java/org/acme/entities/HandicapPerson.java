package org.acme.entities;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class HandicapPerson extends PanacheEntityBase{
    
    @EmbeddedId
    private HandicapPersonId id;
    
    @Column
    private String severity;
    
    @Column
    private String assistiveDevices;

    @MapsId("cin")
    @ManyToOne
    private Person person;

    @MapsId("handicapId")
    @ManyToOne
    private Handicap handicap;


    public HandicapPerson() {}

    public HandicapPersonId getId() {
        return id;
    }

    public void setId(HandicapPersonId id) {
        this.id = id;
    }
    

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getAssistive_devices() {
        return assistiveDevices;
    }

    public void setAssistive_devices(String assistive_devices) {
        this.assistiveDevices = assistive_devices;
    }

}
