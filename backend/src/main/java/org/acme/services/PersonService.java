package org.acme.services;

import java.time.LocalDate;
import java.time.Year;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.acme.dto.PersonDTO;
import org.acme.brevo.entities.BrevoAccountActivationTemplate;
import org.acme.brevo.services.BrevoService;
import org.acme.dto.response.SimplePersonResponseDTO;
import org.acme.entities.grad.Grad;
import org.acme.entities.Person;
import org.acme.entities.RolePerson;
import org.acme.entities.User;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.SoldeCongeId;
import org.acme.entities.conge.TypeConge;
import org.acme.entities.grad.GradPerson;
import org.acme.entities.grad.GradPersonId;
import org.acme.entities.handicap.HandicapPerson;
import org.acme.entities.handicap.HandicapPersonId;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.PersonMapper;
import org.acme.repositories.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.SecurityContext;
import sendinblue.ApiException;


@ApplicationScoped
public class PersonService {
    
    @Inject PersonRepository personRepository;
    @Inject RolesRepository rolesRepository;
    @Inject HandicapRepository handicapRepository;
    @Inject UserRepository userRepository;

    @Inject BrevoService brevoService;
    @Inject JwtService jwtService;
    @Inject
    PersonMapper personMapper;
    @Inject
    GradPersonRepository gradPerson;
    @Inject
    GradPersonRepository gradPersonRepository;

    // for now, I'll add activation token to the ApiResponseDTO
    public String addPerson(PersonDTO personDTO)throws ApiException{
        if(personRepository.findByIdOptional(personDTO.cin.get()).isPresent())
            throw new EntityException("Person with CIN = "+personDTO.cin.get()+ " already exists", 409);
        
        // Save person record
        Person person = personMapper.toNewEntity(personDTO, rolesRepository, handicapRepository);
        person.setStatus_p(Person.STATUS_PERSON_INACTIVE);
        personRepository.persist(person);

        // This adds SoldeConge
        var soldeInitial =  TypeConge.<TypeConge>findByIdOptional(TypeConge.ID_CONGE_ANNUELLE).orElseThrow(()-> new EntityException("Type conge annuelle not found", 404)).getSold_initial();
        SoldeConge solde = new SoldeConge(new SoldeCongeId(Year.now().getValue(), person.getCin()), soldeInitial);
        person.getSoldeList().add(solde);

        // generate password activation token
        String activationToken = jwtService.generateActivationToken(person.getCin(), RolePerson.ROLES[personDTO.roleId.get().intValue()]);

        // Save user record corresponding to the person
        userRepository.persist(new User(personDTO.cin.get(), personDTO.email.get(), PasswordUtils.hashPassword(activationToken)));

        brevoService.sendEmail(person.getEmail(), "Activate your account", new BrevoAccountActivationTemplate(person.getPrenom() + " "+person.getNom(), "localhost:8081/"+activationToken));
        
        return activationToken;
    }

    public void modifyPerson(PersonDTO personDTO, SecurityContext ctx) {
        
        if(!ctx.getUserPrincipal().getName().equals(personDTO.cin.get()) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't modify other people's credentials", 401);
        
        // For now, can't modify cin and email as they foreign key & unique constraint
        Person person = personRepository.findByIdOptional(personDTO.cin.get()).orElseThrow(()-> new EntityException("Person id="+personDTO.cin.get()+" not found", 404));
        personDTO.nom.ifPresent(person::setNom);
        personDTO.prenom.ifPresent(person::setPrenom);
        personDTO.sexe.ifPresent(person::setSexe);
        personDTO.dateN.ifPresent(person::setDate_n);

        personDTO.roleId.ifPresent(roleId->{
            RolePerson role = rolesRepository.findByIdOptional(roleId).orElseThrow(()-> new EntityException("role id="+roleId+" not found", 404));
            person.setRole(role);
        });

        personDTO.gradId.ifPresent(gradId->{
            List<GradPerson> gradList = person.getGradList();
            gradList.get(0).setEndDate(LocalDate.now());
            Grad.findByIdOptional(gradId).orElseThrow(()-> new EntityException("grad id="+gradId+" not found", 404));
            gradList.add(
                    new GradPerson(new GradPersonId(gradId,personDTO.cin.get()))
            );
        });

        personDTO.handicaps.ifPresent(handicapList->{
            handicapList.forEach(handicapDto->{
                var handicap = handicapRepository.findByIdOptional((long)handicapDto.id).orElseThrow(()-> new EntityException("Handicap id="+handicapDto.id+" not found", 404));
                var hp = new HandicapPerson();
                hp.setId(new HandicapPersonId((long)handicapDto.id, personDTO.cin.get()));
                hp.setSeverity(handicapDto.severity);
                hp.setAssistive_devices(handicapDto.assistiveDevice);
                hp.setHandicap(handicap);
                hp.setPerson(person);
            });
        });    }

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
        return personRepository.find(finalQuery, params).list();
    }

    // TODO: test this as I doubt it'll work, oh and See the performance implications
    public List<SimplePersonResponseDTO> getEmployers(){
        return personRepository.findByRoles(RolePerson.EMPLOYE_ID, RolePerson.ADMIN_ID, RolePerson.RH_ID);
    }

    public List<SimplePersonResponseDTO> getEnseignant(){
        return personRepository.findByRoles(RolePerson.ENSEIGNANT_ID);
    }

    public List<Person> getPersons(){
        return personRepository.findAll().list();
    }
}