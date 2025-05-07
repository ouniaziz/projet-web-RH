package org.acme.services;

import io.quarkus.panache.common.Sort;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.SecurityContext;
import org.acme.dto.conge.*;
import org.acme.dto.response.CongeDTO;
import org.acme.entities.Notification;
import org.acme.entities.RolePerson;
import org.acme.entities.conge.*;
import org.acme.exceptions.EntityException.EntityException;
import org.acme.interfaces.CongeMapper;
import org.acme.repositories.DemandeCongeRepository;
import org.acme.repositories.PersonRepository;
import org.acme.repositories.SoldeCongeRepository;
import org.jboss.logging.Logger;
import org.jetbrains.annotations.NotNull;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@ApplicationScoped
//TODO: test notifying the user
public class CongeService {
    Logger log = Logger.getLogger(CongeService.class);

    @Inject CongeMapper congeMapper;
    @Inject PersonRepository personRepository;
    @Inject SoldeCongeRepository soldeCongeRepository;
    @Inject DemandeCongeRepository demandeCongeRepository;
    @Inject NotificationService notificationService;
    @Inject JwtService jwtService;

    @Transactional
    public Long createDemande(DemandeCongeDTO dto){
        personRepository.existsOrElseThrow(dto.cin);
        var demandeConge = congeMapper.dtoToDemande(dto, personRepository);
        demandeConge.setStatusConge(DemandeConge.DEMANDE_PENDING);

        // Notify Admin
        Notification notif = new Notification("Demande congé reçu",dto.cin+" requested a congé", "info", dto.cin);
        notificationService.sendToRole(RolePerson.ADMIN_ID, notif);

        demandeCongeRepository.persist(demandeConge);
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

    private short updateBalance(List<SoldeConge> soldeListe, short duree, boolean useSoldeRestant){
        var iterator = soldeListe.listIterator();

        while (iterator.hasNext() && duree != 0) {
            SoldeConge element = iterator.next();

            // Choose the getter & setter dynamically
            Supplier<Integer> getter = useSoldeRestant
                    ? element::getSoldeRestant
                    : element::getSoldeCompRestant;

            Consumer<Integer> setter = useSoldeRestant
                    ? element::setSoldeRestant
                    : element::setSoldeCompRestant;

            Integer currentSolde = getter.get();

            if (duree - currentSolde > 0) {
                duree -= currentSolde;
                setter.accept(0);
            } else {
                setter.accept(currentSolde - duree);
                duree = 0;
            }
        }

        return duree;
    }

    @Transactional
    //TODO: Add an upper limit to number of days for leaving work
    public void acceptConge(Long demande_id){
        DemandeConge demande = demandeCongeRepository.findByIdOptional(demande_id).orElseThrow(()->new EntityException("Demande id="+demande_id+" not found", 404));
        if(demande.getStatusConge()!= DemandeConge.DEMANDE_PENDING)
            throw new EntityException("Demande id="+demande_id+" already decided",400);

        // First check if date attributes are valid
        short duree = (short)demande.getDuree();
        DateFinRetourDTO dateFinRetour = extractDateFromDebut(demande.getDateDebut(), duree);

        if(!dateFinRetour.dateFin().equals(demande.getDateFin()) || !dateFinRetour.dateRetour().equals(demande.getDateRetour()))
            throw new EntityException("Date fin et/ou retour invalide",400);

        // Check if he has enough balance
        String cin = demande.getPersonCin();
        List<SoldeConge> soldeListe = soldeCongeRepository.findByCin(cin, demande.getExercice().getAnnee()); // which is optimized? demande.getPerson().cin or demande.getPerson_().getCin();
        if(soldeListe.isEmpty())
            throw new EntityException("You have used all of your balance",400);

        // Modifying the balance
        duree = updateBalance(soldeListe, duree, demande.getTypeId()==0);
        if(duree>0)
            throw new EntityException("Not enough balance",400);

        // Accepting the demand
        demande.setStatusConge(DemandeConge.DEMANDE_ACCEPTED);

        var conge = new Conge(demande);
        conge.persist();

        // notify user
        Notification notif = new Notification("Demande congé accepté","Your demande id="+demande_id+" was accepted", "info", demande.getPersonCin());
        notificationService.sendMsg(notif);
    }


    /* I need something that, when given dateDebut + duree, it will return dateFin && dateRetour, taking into account the jours feriers*/
    private Set<String> getJoursFeriers(){
        return JoursFeriers.find("SELECT j.id.day, j.id.month, COALESCE(NULLIF(j.id.year, '--'), '2025') FROM JoursFeriers j").project(JoursFeriersDTO.class)
                .stream()
                .map(jf-> JoursFeriers.generateDateString(jf.day(),jf.month(), jf.year()))
                .collect(Collectors.toSet());
    }

    public DateFinRetourDTO extractDateFromDebut(DateDebutDureeDTO dateDebutDuree){
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        try{
            LocalDate currentDate = LocalDate.parse(dateDebutDuree.dateDebut()/*, formatter*/);
            LocalDate dateFin=null, dateRetour=null;
            Set<String> joursFeriers = getJoursFeriers();
            short joursParcourus = 0;

            while(joursParcourus<=dateDebutDuree.duree()){
                if(currentDate.getDayOfWeek()== DayOfWeek.SUNDAY){
                    currentDate = currentDate.plusDays(1);
                }
                if(joursFeriers.contains(JoursFeriers.generateDateString(currentDate))){
                    currentDate = currentDate.plusDays(1);
                    continue;
                }
                if(joursParcourus== dateDebutDuree.duree()-1){
                    // This is the last day AKA dateFin
                    dateFin = currentDate;
                }

                if(joursParcourus == dateDebutDuree.duree()){
                    dateRetour = currentDate;
                    break;
                }
                currentDate = currentDate.plusDays(1);
                joursParcourus++;
            }

            return new DateFinRetourDTO(dateFin, dateRetour);
        }catch (DateTimeParseException e){
            e.printStackTrace();
            throw new EntityException("Given date not in the 'dd/MM/yyyy' format", 400);
        }
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

    //TODO: to test
    public List<Conge> getCongesByCin(String cin, SecurityContext ctx) {
        // Check if the user has admin/RH privileges or is the concerned person
        /*
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't view people's congés history", 401);
        */
        return Conge.list("person.cin=?1", cin);
    }

    public void ajouterSoldeConge(DemandeAjoutSoldeDTO dto){
        DemandeAjoutSolde demandeAjoutSolde = congeMapper.dtoToDemandeAjout(dto);
        //TODO: complete this!
    }

    public void addJoursFeriers(JoursFeriersDTO joursFeriersDTO) {
        JoursFeriers joursFeriers = new JoursFeriers();
        JoursFeriersId id = new JoursFeriersId();
        id.day = joursFeriersDTO.day();
        id.month = joursFeriersDTO.month();
        id.year = joursFeriersDTO.year();
        joursFeriers.setId(id);
        joursFeriers.persist();
    }

    private DateFinRetourDTO extractDateFromDebut(LocalDate currentDate, short duree){
            LocalDate dateFin=null, dateRetour=null;
            Set<String> joursFeriers = getJoursFeriers();
            short joursParcourus = 0;

            while(joursParcourus<=duree){
                if(currentDate.getDayOfWeek()== DayOfWeek.SUNDAY){
                    currentDate = currentDate.plusDays(1);
                }
                if(joursFeriers.contains(JoursFeriers.generateDateString(currentDate))){
                    currentDate = currentDate.plusDays(1);
                    continue;
                }
                if(joursParcourus== duree-1){
                    // This is the last day AKA dateFin
                    dateFin = currentDate;
                }

                if(joursParcourus == duree){
                    dateRetour = currentDate;
                    break;
                }
                currentDate = currentDate.plusDays(1);
                joursParcourus++;
            }

            return new DateFinRetourDTO(dateFin, dateRetour);
    }

    public List<DemandeConge> getDemandesByCin(String cin, SecurityContext ctx) {
        /*
        if(!ctx.getUserPrincipal().getName().equals(cin) && (!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME)))
            throw new EntityException("You can't view people's congés history", 401);
         */
        return demandeCongeRepository.findByCinOptimized(cin);
    }

    public void addSoldeConge(DemandeAjoutSoldeDTO dto, SecurityContext ctx) {
        /*
        if(!jwtService.getAuthRoles().contains(RolePerson.ADMIN_NAME) || !jwtService.getAuthRoles().contains(RolePerson.RH_NAME))
            throw new EntityException("You can't view people's congés history", 401);
         */
        DemandeAjoutSolde demandeAjoutSolde = congeMapper.dtoToDemandeAjout(dto);
        demandeAjoutSolde.setDateCreated(LocalDate.now());
        demandeAjoutSolde.persist();
        if(demandeAjoutSolde.isPersistent()){
            updateSolde(dto.soldeAjouter, dto.typeId, dto.cin);
            Notification notif = new Notification("Modification du solde du congé","Votre solde du congé est augmenté par "+dto.soldeAjouter+" jours", "info",dto.cin);
            notificationService.sendMsg(notif);
        }
    }

    private void updateSolde(Integer soldeAjouter, Integer type, String cin){
        if(type == TypeConge.ID_CONGE_ANNUELLE){
            soldeCongeRepository.update("soldeRestant = soldeRestant + ?1 WHERE person.cin =?2", soldeAjouter, cin);
        }
        else if(type == TypeConge.ID_CONGE_COMPENSATOIRE){
            soldeCongeRepository.update("soldeCompRestant = soldeCompRestant + ?1 WHERE person.cin =?2", soldeAjouter, cin);
        }
    }
}
