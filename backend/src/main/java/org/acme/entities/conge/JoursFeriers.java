package org.acme.entities.conge;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "JOURS_FERIERS")
public class JoursFeriers extends PanacheEntityBase {
    @EmbeddedId
    private JoursFeriersId id;

    public JoursFeriers(){}

    public void setId(JoursFeriersId id) {
        this.id = id;
    }

    public String getAnnee(){return id.year;}

    public String getMois(){return id.month;}

    public String getJours(){return id.day;}

    public static String generateDateString(String day, String month, String year){
        return day+"/"+month+"/"+year;
    }
    public static String generateDateString(LocalDate date){
        return date.getDayOfMonth()+"/"+date.getMonthValue()+"/"+date.getYear();
    }
}

/*
* It may look wrong to have year as primary key, because "jours feriers" are constant and don't change across years
* But some days depend on Hijri Calendar. These days DO change on the gregorian calendar
* To remedy this, we can put a placeholder string signifying constant "jours feriers"
* This placeholder would be "--" (double dash) in the year Field.
* We should use NULLIF operator to turn years with -- into NULL, which in turn will be replaced with CURRENT year using COALESCE
* Then when iterating the duration of the leave, it will depend on the dates present in the "jours ferriers" along with CURRENT year
*
* Year field is for Islamic holidays and the admin is to be notified every new year to update the "Jours Feriers" table.
* */