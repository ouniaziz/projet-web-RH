package org.acme.mappers;

import java.util.Optional;

import org.acme.DTO.HandicapPersonDTO;
import org.acme.DTO.PersonDTO;
import org.acme.entities.GradEns;
import org.acme.entities.HandicapPerson;
import org.acme.entities.HandicapPersonId;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.PersonMapperInt;
import org.acme.repositories.GradRepository;
import org.acme.repositories.HandicapPersonRepository;
import org.acme.repositories.RolesRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class PersonMapper implements PersonMapperInt{

    @Inject RolesRepository rolesRepository;
    @Inject GradRepository gradRepository;

    @Override
    public PersonDTO toDto(Person person) {
        PersonDTO dto = new PersonDTO();
        dto.cin = Optional.of(person.getCin());
        dto.nom = Optional.of(person.getNom());
        dto.prenom = Optional.of(person.getPrenom());
        dto.sexe = Optional.of(person.getSexe());
        dto.dateN = Optional.ofNullable(person.getDate_n());
        dto.email = Optional.of(person.getEmail());
        dto.roleId = Optional.of(person.getRole().getId_r());
        dto.grad = Optional.ofNullable(person.getGrad()).map(GradEns::getId_g);
        dto.handicaps = Optional.ofNullable(person.getHandicaps())
                        .map(handicaps -> handicaps.stream()
                                            .map(h-> new HandicapPersonDTO(
                                                            h.getId().getHandicapId(),
                                                            h.getSeverity(),
                                                            h.getAssistive_devices())
                                                ).toList());
        return dto;
    }

    @Override
    public Person toEntity(PersonDTO dto) {
        Person person = new Person();
        updatePersonFromDto(person,dto);
        return person;
    }
    
    private void updatePersonFromDto(Person person, PersonDTO dto){
        dto.cin.ifPresent(person::setCin);
        dto.nom.ifPresent(person::setNom);
        dto.prenom.ifPresent(person::setPrenom);
        dto.sexe.ifPresent(person::setSexe);
        dto.dateN.ifPresent(person::setDate_n);
        dto.email.ifPresent(person::setEmail);
        
        dto.roleId.ifPresent(roleId->{
            RolePerson role = rolesRepository.findByIdOptional(roleId)
                                .orElseThrow(()-> new EntityException("Role id="+roleId+" not found", 404));
            person.setRole(role);
        });

        dto.grad.ifPresent((gradId)->{
            GradEns grad = gradRepository.findByIdOptional(gradId)
                            .orElseThrow(()->new EntityException("grad id="+ gradId+" not found", 404));
            person.setGrad(grad);
        });

        dto.handicaps.ifPresent(handicaps->{
            handicaps.forEach(handicap->{
                var handicapPerson = new HandicapPerson();
                handicapPerson.setId(new HandicapPersonId(handicap.id, person.getCin()));
                handicapPerson.setSeverity(handicap.severity);
                handicapPerson.setAssistive_devices(handicap.assistiveDevice);
                
                handicapPerson.persist();
            });
        });
        
    }
}
