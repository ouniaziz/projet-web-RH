package org.acme.entities;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class HandicapPerson extends PanacheEntityBase{
    
    @EmbeddedId
    private HandicapPersonId id;
    
    private String severity;
    private String assistive_devices;

    @MapsId("cin")
    @ManyToOne
    private Person person;

    @MapsId("handicap_id")
    @ManyToOne
    private Handicap handicap;


    public HandicapPerson() {}

    public HandicapPersonId getCin() {
        return id;
    }

    public void setCin(HandicapPersonId id) {
        this.id = id;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getAssistive_devices() {
        return assistive_devices;
    }

    public void setAssistive_devices(String assistive_devices) {
        this.assistive_devices = assistive_devices;
    }

}
