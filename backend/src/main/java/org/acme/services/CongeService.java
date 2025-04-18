package org.acme.services;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.acme.dto.conge.DemandeCongeDTO;
import org.acme.dto.conge.TypeCongeDTO;
import org.acme.dto.response.CongeDTO;
import org.acme.entities.Notification;
import org.acme.entities.RolePerson;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.TypeConge;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.CongeMapper;
import org.acme.interfaces.PersonMapper;
import org.acme.repositories.DemandeCongeRepository;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.SoldeCongeRepository;
import org.jboss.logging.Logger;
import org.jetbrains.annotations.NotNull;

import java.time.Period;
import java.util.List;

@ApplicationScoped
//TODO: test notifying the user
public class CongeService {
    Logger log = Logger.getLogger(CongeService.class);

    @Inject CongeMapper congeMapper;
    @Inject PersonRepository personRepository;
    @Inject SoldeCongeRepository soldeCongeRepository;
    @Inject DemandeCongeRepository demandeCongeRepository;
    @Inject NotificationService notificationService;


    // TODO: Complete notify admins via websockets
    @Transactional
    public Long createDemande(DemandeCongeDTO dto){
        personRepository.existsOrElseThrow(dto.cin);
        var demandeConge = congeMapper.dtoToDemande(dto, personRepository);
        demandeConge.setStatusConge(DemandeConge.DEMANDE_PENDING);
        demandeCongeRepository.persist(demandeConge);
        // Notify Admin
        Notification notif = new Notification("Demande congé reçu",dto.cin+" requested a congé", "info", dto.cin);
        notificationService.sendToRole(RolePerson.ADMIN_ID, notif);

        return demandeConge.id;
    }

    @Transactional
    public void createTypeConge(@NotNull TypeCongeDTO type){
        TypeConge typeConge = new TypeConge(type);
        if(!typeConge.isPersistent())
            typeConge.persist();
    }

    public List<TypeConge> getTypesConges(){
        return TypeConge.listAll(Sort.ascending("id"));
    }

    @Transactional
    public void refuseConge(Long id){
        var demande = demandeCongeRepository.findByIdOptional(id).orElseThrow(()->new EntityException("Demande id="+id+" not found", 404));
        if(demande.getStatusConge()!= DemandeConge.DEMANDE_PENDING)
            throw new EntityException("Demande id="+id+" already decided",400);
        demande.setStatusConge(DemandeConge.DEMANDE_REFUSE);

        log.warn(demande.getPersonCin());
        // Notify user
        Notification notif = new Notification("Demande congé refusée","Your demande id="+id+" was refused", "warning", demande.getPersonCin());
        notificationService.sendMsg(notif);
    }

    @Transactional
    public void acceptConge(Long demande_id){
        DemandeConge demande = demandeCongeRepository.findByIdOptional(demande_id).orElseThrow(()->new EntityException("Demande id="+demande_id+" not found", 404));
        if(demande.getStatusConge()!= DemandeConge.DEMANDE_PENDING)
            throw new EntityException("Demande id="+demande_id+" already decided",400);

        // First check if date attributes are valid
        var date_deb = demande.getDateDebut();
        var date_retour = demande.getDateRetour();
        var duree = demande.getDuree();
        if(Period.between(date_deb,date_retour).getDays()<duree)
            throw new EntityException("Durée du congé invalide",400);

        // Check if he has enough balance
        String cin = demande.getPersonCin();
        List<SoldeConge> soldeListe = soldeCongeRepository.findByCin(cin, demande.getExercice().getAnnee()); // which is optimized? demande.getPerson().cin or demande.getPerson_().getCin();
        if(soldeListe.isEmpty())
            throw new EntityException("You have used all of your balance",400);

        // Modifying the balance
        var iterator = soldeListe.listIterator();
        while(iterator.hasNext() && duree!=0){
            SoldeConge element = iterator.next();
            if(duree-element.getSoldeRestant()>0){
               duree -= element.getSoldeRestant();
               element.setSoldeRestant(0);
            }
            else{
                element.setSoldeRestant(element.getSoldeRestant()-duree);
                duree=0;
            }
        }
        if(duree>0)
            throw new EntityException("You have used all of your balance",400);

        // Accepting the demand
        demande.setStatusConge(DemandeConge.DEMANDE_ACCEPTED);

        var conge = new Conge(demande);
        conge.persist();

        // notify user
        Notification notif = new Notification("Demande congé accepté","Your demande id="+demande_id+" was accepted", "success", demande.getPersonCin());
        notificationService.sendMsg(notif);
    }

    public List<DemandeConge> getDemandes() {
        return demandeCongeRepository.listAll();
    }

    public List<CongeDTO> getConges() {
        return Conge.find("""
                SELECT c.id, c.date_debut, c.date_fin, c.date_retour, c.duree,
                    c.exercice.annee, c.type.nom
                FROM Conge c
                """).project(CongeDTO.class).list();
    }
}
