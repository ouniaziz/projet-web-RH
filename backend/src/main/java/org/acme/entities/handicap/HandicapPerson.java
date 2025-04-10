package org.acme.entities.handicap;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.acme.entities.Person;

@Entity
@Table(name = "Handicap_Person")
public class HandicapPerson extends PanacheEntityBase{
    @EmbeddedId
    private HandicapPersonId id;
    
    @Column
    private String severity;
    
    @Column(name = "ASSISTIVE_DEVICES")
    private String assistiveDevices;

    @MapsId("cin")
    @ManyToOne
    @JoinColumn(name = "cin", referencedColumnName = "cin")
    private Person person;

    @MapsId("handicapId")
    @ManyToOne
    @JoinColumn(name = "HANDICAP_ID", referencedColumnName = "ID_HAND")
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

    public void setPerson(Person person) {
        this.person = person;
    }

    public void setHandicap(Handicap handicap) {
        this.handicap = handicap;
    }

    
}
