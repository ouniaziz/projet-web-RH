package org.acme.services;

import java.util.List;


import org.acme.DTO.PersonDTO;
import org.acme.brevo.entities.BrevoAccountActivationTemplate;
import org.acme.brevo.services.BrevoService;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.entities.User;
import org.acme.exceptions.PersonExceptions.PersonException;
import org.acme.exceptions.RoleExceptions.RoleException;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.RolesRepository;
import org.acme.repositories.UserRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.SecurityContext;
import sendinblue.ApiException;


@ApplicationScoped
public class PersonService {
    
    @Inject PersonRepository personRepository;
    @Inject RolesRepository rolesRepository;
    @Inject BrevoService brevoService;
    @Inject UserRepository userRepository;
    @Inject JwtService jwtService;
    
    
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

        brevoService.sendEmail(personDTO.email, "Activate your account", new BrevoAccountActivationTemplate(personDTO.prenom + " "+personDTO.nom, "localhost:8081/"+activationToken));
    }

    public void modifyPerson(PersonDTO personDTO, SecurityContext ctx){
        if(!ctx.getUserPrincipal().getName().equals(personDTO.cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new PersonException("You can't modify other people's credentials", 401);
        
            // TODO: modify person's data
    }

    public Person getPerson(String cin, SecurityContext ctx){
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new PersonException("You can't access other people's credentials", 401);
        
        return personRepository.findByIdOptional(cin).orElseThrow(()->new PersonException("User cin="+cin+" not found", 404));
    }

    public List<Person> getEmployers(){
        return personRepository.list("role.id_r", RolePerson.EMPLOYE_ID);
    }

    public List<Person> getEnseignant(){
        return personRepository.list("role.id_r", RolePerson.ENSEIGNANT_ID);
    }

    public List<Person> getPersons(){
        return personRepository.findAll().list();
    }
}