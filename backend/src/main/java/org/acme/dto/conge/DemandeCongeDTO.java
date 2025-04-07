package org.acme.dto.conge;

import java.time.LocalDate;

public class DemandeCongeDTO {
    public Long id;
    public LocalDate dateDebut;
    public LocalDate dateFin;
    public LocalDate dateRetour;
    public int duree;

    public int statusConge;

    public String cin;

    public int annee;

    public int type_id;
}
