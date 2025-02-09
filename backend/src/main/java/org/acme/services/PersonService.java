package org.acme.services;

import org.acme.DTO.PersonDTO;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.exceptions.PersonException;
import org.acme.exceptions.RoleException;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.RolesRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;


@ApplicationScoped
public class PersonService {
    
    @Inject PersonRepository personRepository;
    @Inject RolesRepository rolesRepository;
    @Inject EmailService mailService;

    @Transactional
    public void addPerson(PersonDTO personDTO){
        if(personRepository.findByIdOptional(personDTO.cin).isPresent())
            throw new PersonException("Person with CIN = "+personDTO.cin+ " already exists", 409);
        
        RolePerson role = rolesRepository.findByIdOptional(personDTO.roleId)
                        .orElseThrow(()-> new RoleException("Role of roleId="+personDTO.roleId+" not found", 404));

        Person person = new Person(personDTO, role);
        personRepository.persist(person);

        mailService.sendEmail("mohamedyacine.kharrat@isimm.u-monastir.tn", "Welcome "+ personDTO.prenom+ " "+personDTO.nom, "Added person whose cin = "+personDTO.cin+"  to database");
    }
}
