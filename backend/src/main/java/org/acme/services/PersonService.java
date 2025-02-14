package org.acme.services;

import java.util.List;

import org.acme.DTO.PersonDTO;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.entities.User;
import org.acme.exceptions.PersonExceptions.PersonException;
import org.acme.exceptions.RoleExceptions.RoleException;
import org.acme.interfaces.BrevoTemplate;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.RolesRepository;
import org.acme.repositories.UserRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import sendinblue.ApiException;


@ApplicationScoped
public class PersonService {
    
    @Inject PersonRepository personRepository;
    @Inject RolesRepository rolesRepository;
    @Inject BrevoService brevoService;
    @Inject UserRepository userRepository;
    @Inject JwtService jwtService;
    @Transactional
    public void addPerson(PersonDTO personDTO)throws ApiException{
        if(personRepository.findByIdOptional(personDTO.cin).isPresent())
            throw new PersonException("Person with CIN = "+personDTO.cin+ " already exists", 409);
        
        RolePerson role = rolesRepository.findByIdOptional(personDTO.roleId)
                        .orElseThrow(()-> new RoleException("Role of roleId="+personDTO.roleId+" not found", 404));

        // Save person record
        Person person = new Person(personDTO, role);
        personRepository.persist(person);

        // generate password activation token
        String activationToken = jwtService.generateActivationToken(personDTO.cin, role.getNom_r());
        // Save user record corresponding to the person
        userRepository.persist(new User(personDTO, PasswordUtils.hashPassword(activationToken)));

        brevoService.sendActivateAccountEmail(personDTO.email, "Activate your account", new BrevoTemplate(personDTO.prenom + " "+personDTO.nom, "localhost:8081/"+activationToken));
    }

    public List<Person> getPersons(){
        return personRepository.findAll().list();
    }
}