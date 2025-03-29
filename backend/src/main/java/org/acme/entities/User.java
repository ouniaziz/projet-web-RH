package org.acme.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

// TODO: id_unique: CNRPS field
@Entity
@Table(name = "USERS")
public class User extends PanacheEntityBase{
    public static int PASSWORD_OK = 1;
    public static int PASSWORD_FORGOT = 0;
    public static int PASSWORD_NOT_ACTIVE = -1;

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
    @Column(name ="DEVICE_ID")
    private String deviceId;
    private int status_passw;
    private String pass_token;

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
    
    public String getPass_token() {
        return pass_token;
    }

    public void setPass_token(String pass_token) {
        this.pass_token = pass_token;
    }

    public User() {
    }

    public User(String cin, String email, String passw_token){
        this.cin = cin;
        this.email = email;
        status_passw = PASSWORD_NOT_ACTIVE;
        pass_token = passw_token;
    }
}