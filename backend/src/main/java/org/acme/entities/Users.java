package org.acme.entities;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity

public class Users extends PanacheEntityBase{
    @Id
    @Column(length = 8)
    private String cin;
    
    @OneToOne
    @MapsId("cin")
    @JoinColumn(name = "cin", referencedColumnName = "cin")
    private Person person;

    @Column(unique = true)
    private String email;
    
    @Column(name = "PASSW_HASH")
    private String passw;
    private String deviceId;
    private int status_passw;
    
    public String getCin() {
        return cin;
    }
    public void setCin(String username) {
        this.cin = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassw() {
        return passw;
    }
    public void setPassw(String passw) {
        this.passw = passw;
    }
    public String getDeviceId() {
        return deviceId;
    }
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }
    public int getStatus_passw() {
        return status_passw;
    }
    public void setStatus_passw(int status_passw) {
        this.status_passw = status_passw;
    }

    public Users() {
    }


}