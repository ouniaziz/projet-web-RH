package org.acme.interfaces;

import org.acme.dto.conge.DemandeAjoutSoldeDTO;
import org.acme.dto.conge.DemandeCongeDTO;
import org.acme.entities.Exercice;
import org.acme.entities.Person;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeAjoutSolde;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.TypeConge;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.repositories.PersonRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.Year;

@Mapper(componentModel = "cdi", imports = {Year.class})
public interface CongeMapper {
    @Mapping(target="dateDebut", source = "dto.dateDebut")
    @Mapping(target="dateFin", source = "dto.dateFin")
    @Mapping(target="dateRetour", source = "dto.dateRetour")
    @Mapping(target="duree", source = "dto.duree")
    @Mapping(target="person", expression = "java(mapPerson(dto.cin, personRepo))")
    @Mapping(target="exercice", expression = "java(mapExercice(Year.now().getValue()))")
    @Mapping(target="type", expression = "java(mapType(dto.type_id))")
    @Mapping(target = "id", ignore = true)
    @Mapping(target="statusConge", ignore = true)
    DemandeConge dtoToDemande(DemandeCongeDTO dto, @Context PersonRepository personRepo);

    default Person mapPerson(String cin, @Context PersonRepository personRepo){
        return personRepo.findByIdOptional(cin).orElseThrow(()-> new EntityException("Person cin="+cin+" not found", 404));
    }

    default Exercice mapExercice(int annee){
        return Exercice.<Exercice>findByIdOptional(annee).orElseThrow(()->new EntityException("Exercice "+annee+" not found", 404));
    }

    default TypeConge mapType(int type_id){
        return TypeConge.<TypeConge>findByIdOptional(type_id).orElseThrow(()-> new EntityException("Conge de type ="+type_id+" not found",404));
    }


    @Mapping(target = "justification", source = "dto.justification")
    @Mapping(target = "soldeAjoute", source = "dto.soldeAjouter")
    @Mapping(target = "type", expression = "java(mapTypeConge(dto.typeId))")
    @Mapping(target = "person_cin", expression = "java(mapPerson(dto.cin))")
    DemandeAjoutSolde dtoToDemandeAjout(DemandeAjoutSoldeDTO dto);

    default TypeConge mapTypeConge(int typeId){
        return null;
    }
    default Person mapPerson(String cin){
        return null;
    }
}
