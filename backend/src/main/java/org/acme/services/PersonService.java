package org.acme.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.acme.DTO.PersonDTO;
import org.acme.brevo.entities.BrevoAccountActivationTemplate;
import org.acme.brevo.services.BrevoService;
import org.acme.entities.GradEns;
import org.acme.entities.HandicapPerson;
import org.acme.entities.HandicapPersonId;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.entities.User;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.mappers.PersonMapper;
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
    @Inject PersonMapper personMapper;
    
    // for now, I'll add activation token to the ApiResponseDTO
    public String addPerson(PersonDTO personDTO)throws ApiException{
        if(personRepository.findByIdOptional(personDTO.cin.get()).isPresent())
            throw new EntityException("Person with CIN = "+personDTO.cin.get()+ " already exists", 409);
        
        // Save person record
        Person person = personMapper.toEntity(personDTO);
        //personRepository.persist(person);

        // generate password activation token
        String activationToken = jwtService.generateActivationToken(person.getCin(), RolePerson.ROLES[personDTO.roleId.get().intValue()]);
        // Save user record corresponding to the person
        userRepository.persist(new User(personDTO.cin.get(), personDTO.email.get(), PasswordUtils.hashPassword(activationToken)));

        brevoService.sendEmail(person.getEmail(), "Activate your account", new BrevoAccountActivationTemplate(person.getPrenom() + " "+person.getNom(), "localhost:8081/"+activationToken));
        
        return activationToken;
    }

    public void modifyPerson(PersonDTO personDTO, SecurityContext ctx){
        
        if(!ctx.getUserPrincipal().getName().equals(personDTO.cin.get()) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't modify other people's credentials", 401);
        
        // For now, can't modify cin and email as they foreign key & unique constraint
        Person person = personRepository.findByIdOptional(personDTO.cin.get()).orElseThrow(()-> new EntityException("Person id="+personDTO.cin.get()+" not found", 404));
        personDTO.nom.ifPresent(person::setNom);
        personDTO.prenom.ifPresent(person::setPrenom);
        personDTO.sexe.ifPresent(person::setSexe);
        personDTO.dateN.ifPresent(person::setDate_n);

        personMapper.updateComplexAttributesFromDto(person, personDTO);
    }

    public void archivePerson(String cin){
        Person p = personRepository.findByIdOptional(cin).orElseThrow(()-> new EntityException("Person id="+cin+" not found", 404));
        p.setStatus_p(Person.STATUS_PERSON_ARCHIVED);
    }

    public Person getPerson(String cin, SecurityContext ctx){
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't access other people's credentials", 401);
        
        return personRepository.findByIdOptional(cin).orElseThrow(()->new EntityException("User cin="+cin+" not found", 404));
    }

    public List<Person> filterRecords(String sexe, int grad, int anciennete, int handicap, String actif){
        Map<String, Object> params = new HashMap<>();
        boolean isHandicapJoin = false;
        // Build the query dynamically
        StringBuilder query = new StringBuilder("FROM Person p where 1 = 1"); // Base condition to simplify chaining

        if (grad != -1) {
            query.append(" and p.grad.id_g = :grad");
            params.put("grad", grad);
        }
        if (sexe != null) {
            query.append(" and p.sexe = :sexe");
            params.put("sexe", sexe);
        }
        if (anciennete != -1) {
            query.append(" and p.anciennete = :anciennete");
            params.put("anciennete", anciennete);
        }
        if (actif!= null && (actif.equals("false") || actif.equals("true"))) {
            query.append(" and p.actif = :actif");
            params.put("actif", actif);
        }
        if (handicap != -1) {
            isHandicapJoin = true;
            query.append(" JOIN p.handicaps h");
            query.append(" WHERE h.handicap.id_hand = :handicap");
            params.put("handicap", handicap);
        }

        String finalQuery = isHandicapJoin? "SELECT DISTINCT p "+query.toString():query.toString();
        /*
        * SELECT DISTINCT p
        * FROM Person p, p.handicaps h
        * WHERE p.grad = grad AND p.sexe = sexe AND p.anciennete = anciennete AND p.actif = actif
        * AND h.handicap.id_hand = handicap
        * */
        return personRepository.find(finalQuery, params).list();
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