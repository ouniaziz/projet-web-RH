package org.acme.dto.response;

import java.time.LocalDate;

public record CongeDTO(Integer id, LocalDate dateDebut, LocalDate dateFin, LocalDate dateRetour,
                       Integer duree, Integer annee, String type){

}
