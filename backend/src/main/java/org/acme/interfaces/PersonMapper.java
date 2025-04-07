package org.acme.interfaces;

import org.acme.dto.HandicapPersonDTO;
import org.acme.dto.PersonDTO;
import org.acme.dto.response.SimplePersonResponseDTO;
import org.acme.entities.Person;

import org.acme.entities.RolePerson;
import org.acme.entities.grad.Grad;
import org.acme.entities.grad.GradPerson;
import org.acme.entities.grad.GradPersonId;
import org.acme.entities.handicap.HandicapPerson;
import org.acme.entities.handicap.HandicapPersonId;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.repositories.GradPersonRepository;
import org.acme.repositories.HandicapRepository;
import org.acme.repositories.RolesRepository;
import org.mapstruct.*;

import java.time.LocalDate;
import java.util.*;

/**
 * An interface to ensure entity-to-dto conversion and vice-versa
 */
@Mapper(componentModel = "cdi", imports = {Optional.class, List.class})
public interface PersonMapper{
    //TODO: Modify grad and handicaps to match SimplePersonResponseDTO's attribute
    @Mapping(target = "cin", source = "person.cin")
    @Mapping(target = "nom", source="person.nom")
    @Mapping(target = "prenom", source = "person.prenom")
    @Mapping(target = "sexe", source = "person.sexe")
    @Mapping(target = "dateN", source = "person.date_n")
    @Mapping(target = "status", source = "person.status")
    @Mapping(target = "anciennete", source = "person.anciennete")
    @Mapping(target = "email", source = "person.email")
    @Mapping(target = "role", expression= "java(person.getRole().getNomRole())")
    @Mapping(target = "grad", expression= "java(!person.getGradList().isEmpty() ? person.getGradList().get(0).getGrad().getNom() : null)")
    @Mapping(target = "hasHandicap", expression = "java(person.getHandicaps().size()>0)")
    @Mapping(target = "image", ignore = true)
    SimplePersonResponseDTO toResponseDto(Person person);

    default Optional<List<HandicapPersonDTO>> mapToHandicapsDTO(List<HandicapPerson> handicaps) {
        if (handicaps == null) return Optional.empty();
        return Optional.of(handicaps.stream()
                .map(h -> new HandicapPersonDTO(
                        h.getId().getHandicapId().intValue(),
                        h.getSeverity(),
                        h.getAssistive_devices()))
                .toList());
    }


    // This is used when adding new people to db
    @Mapping(target = "cin", source = "dto.cin", qualifiedByName = "optionalTo")
    @Mapping(target = "nom", source = "dto.nom", qualifiedByName = "optionalTo")
    @Mapping(target = "prenom", source = "dto.prenom", qualifiedByName = "optionalTo")
    @Mapping(target = "sexe", source = "dto.sexe", qualifiedByName = "optionalTo")
    @Mapping(target = "date_n", source = "dto.dateN", qualifiedByName = "optionalTo")
    @Mapping(target = "email", source = "dto.email", qualifiedByName = "optionalTo")
    @Mapping(target = "anciennete", source = "dto.anciennete", qualifiedByName = "optionalTo")
    @Mapping(target = "role", expression = "java(mapRole(dto.roleId.orElse(null),roleRepo))")
    @Mapping(target = "handicaps", expression = "java(mapHandicaps(dto.handicaps.orElse(null), dto.cin.get(), handicapRepo))")
    @Mapping(target = "gradList", expression = "java(mapGradPerson(dto.gradId.orElse(null), dto.cin.get()))")
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "status_p", ignore = true)
    @Mapping(target = "soldeList", ignore = true)
    Person toNewEntity(PersonDTO dto, @Context RolesRepository roleRepo, @Context HandicapRepository handicapRepo);

    @Named("optionalTo")
    default <T> T optionalTo(Optional<T> opt, @TargetType Class<T> targetType){
        return opt.orElse(null);
    }

    default RolePerson mapRole(Long roleId, @Context RolesRepository rolesRepository) {
        if (roleId == null) return null;
        return rolesRepository.findByIdOptional(roleId)
                .orElseThrow(() -> new EntityException("Role not found", 404));
    }

    default List<GradPerson> mapGradPerson(Long gradId, String person_id) {
        var gradList = new ArrayList<GradPerson>();
        if (gradId != null){
            GradPerson gradPerson = new GradPerson(new GradPersonId(gradId,person_id));
            gradPerson.setStart(LocalDate.now());
            gradList.add(gradPerson);
        }
        return gradList;
    }

    default List<HandicapPerson> mapHandicaps(List<HandicapPersonDTO> dto, String cin, @Context HandicapRepository handicapRepository){
        var handicaps = new ArrayList<HandicapPerson>();
        if(dto == null || dto.isEmpty())
            return handicaps;
        dto.forEach(handicapDto->{
            var handicap = handicapRepository.findByIdOptional((long)handicapDto.id).orElseThrow(()-> new EntityException("Handicap id="+handicapDto.id+" not found", 404));
            var hp = new HandicapPerson();
            hp.setId(new HandicapPersonId((long)handicapDto.id, cin));
            hp.setSeverity(handicapDto.severity);
            hp.setAssistive_devices(handicapDto.assistiveDevice);
            hp.setHandicap(handicap);
            handicaps.add(hp);
        });
        return handicaps;
    }
}