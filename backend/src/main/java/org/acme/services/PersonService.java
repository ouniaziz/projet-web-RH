package org.acme.services;

import java.time.LocalDate;
import java.time.Year;
import java.util.*;


import org.acme.dto.PersonDTO;
import org.acme.brevo.entities.BrevoAccountActivationTemplate;
import org.acme.brevo.services.BrevoService;
import org.acme.dto.response.SimplePersonResponseDTO;
import org.acme.entities.*;
import org.acme.entities.grad.Grad;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.SoldeCongeId;
import org.acme.entities.conge.TypeConge;
import org.acme.entities.grad.GradPerson;
import org.acme.entities.handicap.HandicapPerson;
import org.acme.entities.handicap.HandicapPersonId;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.PersonMapper;
import org.acme.repositories.*;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.SecurityContext;
import org.jboss.logging.Logger;
import sendinblue.ApiException;


@ApplicationScoped

public class PersonService {
    Logger log = Logger.getLogger(PersonService.class);

    @Inject PersonRepository personRepository;
    @Inject RolesRepository rolesRepository;
    @Inject HandicapRepository handicapRepository;
    @Inject UserRepository userRepository;

    @Inject BrevoService brevoService;
    @Inject JwtService jwtService;
    @Inject
    PersonMapper personMapper;

    @Inject NotificationService notificationService;


    // for now, I'll add activation token to the ApiResponseDTO
    public String addPerson(PersonDTO personDTO)throws ApiException{
        personRepository.existsThrow(personDTO.cin.get());
        
        // Mapping dto to Person
        Person person = personMapper.toNewEntity(personDTO, rolesRepository, handicapRepository);

        // mapping collections
        person.setHandicaps(personMapper.mapHandicaps(personDTO.handicaps.orElse(null), personDTO.cin.get(),handicapRepository, person));
        person.setGradList(personMapper.mapGradPerson(personDTO.gradId.orElse(null), personDTO.cin.get(), person));

        person.setStatus_p(Person.STATUS_PERSON_INACTIVE);

        // This adds SoldeConge
        int currentYear = Year.now().getValue();
        Exercice exercice = Exercice.<Exercice>findByIdOptional(currentYear)
                .orElseGet(() -> {
                    Exercice newExercice = new Exercice();
                    newExercice.setAnnee(currentYear);
                    newExercice.persist();
                    return newExercice;
                });
        var soldeInitial =  TypeConge.<TypeConge>findByIdOptional(TypeConge.ID_CONGE_ANNUELLE).orElseThrow(()-> new EntityException("Type conge annuelle not found", 404)).getSold_initial();
        SoldeConge solde = new SoldeConge(new SoldeCongeId(), soldeInitial);
        solde.setExercice(exercice);
        solde.setPerson(person);
        person.getSoldeList().add(solde);

        personRepository.persist(person);

        // generate password activation token
        String activationToken = jwtService.generateActivationToken(person.getCin(), RolePerson.ROLES[personDTO.roleId.get().intValue()]);

        // Save user record corresponding to the person
        userRepository.persist(new User(personDTO.cin.get(), personDTO.email.get(), PasswordUtils.hashPassword(activationToken)));

        //TODO: Change this into the app's real uri
        brevoService.sendEmail(person.getEmail(), "Activate your account", new BrevoAccountActivationTemplate(person.getPrenom() + " "+person.getNom(), "localhost:3000/activation_compte?token="+activationToken));
        
        return activationToken;
    }

    public void modifyPerson(PersonDTO personDTO, SecurityContext ctx) {
        /*
        if(!ctx.getUserPrincipal().getName().equals(personDTO.cin.get()) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't modify other people's credentials", 401);
        */
        // For now, can't modify cin and email as they foreign key & unique constraint
        Person person = personRepository.findByIdOptional(personDTO.cin.get()).orElseThrow(()-> new EntityException("Person id="+personDTO.cin.get()+" not found", 404));
        personDTO.nom.ifPresent(person::setNom);
        personDTO.prenom.ifPresent(person::setPrenom);
        personDTO.sexe.ifPresent(person::setSexe);
        personDTO.dateN.ifPresent(person::setDate_n);
        personDTO.telephone.ifPresent(person::setTelephone);
        personDTO.adresse.ifPresent(person::setAdresse);
        personDTO.image.ifPresent(image->{
            person.setImage(Base64.getDecoder().decode(image));
        });

        personDTO.roleId.ifPresent(roleId->{
            RolePerson role = rolesRepository.findByIdOptional(roleId).orElseThrow(()-> new EntityException("role id="+roleId+" not found", 404));
            person.setRole(role);
        });

        personDTO.gradId.ifPresent(gradId->{
            List<GradPerson> gradList = person.getGradList();
            gradList.get(0).setEndDate(LocalDate.now());
            Grad grad = Grad.<Grad>findByIdOptional(gradId).orElseThrow(()-> new EntityException("grad id="+gradId+" not found", 404));

            GradPerson gradPerson= new GradPerson();
            gradPerson.setGrad(grad);
            gradPerson.setPerson(person);
            gradList.add(gradPerson);
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
        });

        Notification notif = new Notification("User modification", "User cin ="+personDTO.cin.get()+" was modified", "info", personDTO.cin.get());
        notificationService.sendMsg(notif);
    }

    @Deprecated(forRemoval = true)
    public void archivePerson(String cin){
        Person p = personRepository.findByIdOptional(cin).orElseThrow(()-> new EntityException("Person id="+cin+" not found", 404));
        p.setStatus_p(Person.STATUS_PERSON_ARCHIVED);
    }

    public Person getPerson(String cin, SecurityContext ctx){
        /*
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't access other people's credentials", 401);
        */
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

    public List<SimplePersonResponseDTO> getEmployers(){
        return personRepository.findByRoles(RolePerson.EMPLOYE_ID, RolePerson.ADMIN_ID, RolePerson.RH_ID);
    }

    public List<SimplePersonResponseDTO> getEnseignant(){
        return personRepository.findByRole(RolePerson.ENSEIGNANT_ID);
    }

    public List<Person> getPersons(){
        return personRepository.findAll().list();
    }

    //TODO: DELETE Person
    public boolean deletePerson(String cin, SecurityContext ctx){
        /*
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't modify other people's credentials", 401);

        */
        return personRepository.deleteById(cin);
    }
}