package org.acme.services;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.acme.dto.conge.DemandeCongeDTO;
import org.acme.dto.conge.TypeCongeDTO;
import org.acme.entities.conge.Conge;
import org.acme.entities.conge.DemandeConge;
import org.acme.entities.conge.SoldeConge;
import org.acme.entities.conge.TypeConge;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.CongeMapper;
import org.acme.repositories.DemandeCongeRepository;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.SoldeCongeRepository;
import org.jetbrains.annotations.NotNull;

import java.time.Period;
import java.util.List;

@ApplicationScoped
public class CongeService {
    @Inject CongeMapper congeMapper;
    @Inject PersonRepository personRepository;
    @Inject
    SoldeCongeRepository soldeCongeRepository;
    @Inject DemandeCongeRepository demandeCongeRepository;

    // TODO: Complete notify admins via websockets
    @Transactional
    public void createDemande(DemandeCongeDTO dto){
        var demandeConge = congeMapper.dtoToDemande(dto, personRepository);
        demandeCongeRepository.persist(demandeConge);

        // Notify Admins
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

    // TODO: Notify user!!
    @Transactional
    public void refuseConge(Long id){
        var demande = demandeCongeRepository.findByIdOptional(id).orElseThrow(()->new EntityException("Demande id="+id+" not found", 404));
        if(demande.getStatusConge()!= DemandeConge.DEMANDE_PENDING)
            throw new EntityException("Demande id="+id+" already decided",400);
        demande.setStatusConge(DemandeConge.DEMANDE_REFUSE);

        // Notify user
    }

    @Transactional
    public void acceptConge(Long demande_id){
        var demande = demandeCongeRepository.findByIdOptional(demande_id).orElseThrow(()->new EntityException("Demande id="+demande_id+" not found", 404));
        // First check if date attributes are valid
        var date_deb = demande.getDateDebut();
        var date_retour = demande.getDateRetour();
        var duree = demande.getDuree();
        if(Period.between(date_deb,date_retour).getDays()<demande.getDuree())
            throw new EntityException("Durée du congé invalide",400);

        // Check if he has enough balance
        List<SoldeConge> soldeListe = soldeCongeRepository.findByCin(demande.getPerson().cin); // which is optimized? demande.getPerson().cin or demande.getPerson_().getCin();

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

        // Accepting the demand
        demande.setStatusConge(DemandeConge.DEMANDE_ACCEPTED);

        var conge = new Conge(demande);
        conge.persist();
    }
}
