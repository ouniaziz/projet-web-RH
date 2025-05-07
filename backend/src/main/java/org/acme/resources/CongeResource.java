package org.acme.resources;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.acme.dto.conge.*;
import org.acme.dto.response.ApiResponseDTO;
import org.acme.entities.RolePerson;
import org.acme.entities.conge.DemandeAjoutSolde;
import org.acme.entities.conge.JoursFeriers;
import org.acme.services.CongeService;

@Path("/api/conges")
// TODO: Test the resource and Conge operations and Add @GET Demande & @GET Congé
// TODO: Now, Add method to import already existing congés into the DB. Don't get here until you tested evverything prior to that
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CongeResource {
    @Inject
    CongeService congeService;


    @GET
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response getConges(){
        return Response.ok(new ApiResponseDTO(200,"Fetched conges successfully", null, congeService.getConges())).build();
    }

    //This is to get état(history) of the conges of A person
    @GET
    @Path("/{cin}")
    @RolesAllowed("**")
    public Response getCongeOfPerson(@PathParam(value = "cin")String cin, @Context SecurityContext ctx){
        return Response.ok(new ApiResponseDTO(200,"Fetched successfully", null,congeService.getCongesByCin(cin,ctx))).build();
    }
    @GET
    @Path("/demande/{cin}")
    @RolesAllowed("**")
    public Response getDemandeByCin(@PathParam(value = "cin")String cin, @Context SecurityContext ctx){
        return Response.ok(new ApiResponseDTO(200,"Fetched successfully", null,congeService.getDemandesByCin(cin,ctx))).build();
    }

    @GET
    @Path("/type")
    @RolesAllowed("**")
    public Response getTypesConge(){
        return Response.ok(new ApiResponseDTO(200,"Fetched Types conge successfully", null,congeService.getTypesConges())).build();
    }

    @POST
    @Path("/type")
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response addType(TypeCongeDTO type){
        congeService.createTypeConge(type);
        return Response.accepted(new ApiResponseDTO(201, "Type congé created successfully", null, null)).build();
    }

    @GET
    @Path("/demande")
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response getDemandes(){
        return Response.ok(new ApiResponseDTO(200, "Fetched demandes de congés", null, congeService.getDemandes())).build();
    }


    @Path("/dateFinRetour")
    @POST
    public Response getDateFinRetour(DateDebutDureeDTO dto){
        DateFinRetourDTO res = congeService.extractDateFromDebut(dto);
        return Response.ok(res).build();
    }

    @POST
    @Path("/demande")
    @RolesAllowed("**")
    public Response addDemande(DemandeCongeDTO demande){
        Long id = congeService.createDemande(demande);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé id="+id+" created successfully", null, null)).build();
    }

    @PUT
    @Path("/demande/accept/{id}")
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response acceptDemande(@PathParam("id") Long demande_id){
        congeService.acceptConge(demande_id);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé id="+demande_id+ " accepted successfully", null, null)).build();
    }

    @PUT
    @Path("/demande/refuse/{id}")
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response refuseDemande(@PathParam("id") Long demande_id){
        congeService.refuseConge(demande_id);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé id="+demande_id+ " refused successfully", null, null)).build();
    }

    @Path("/jours_feriers")
    @GET
    public Response getJoursFeriers() {
        return Response.ok(new ApiResponseDTO(200, "Jours feriers fetched", null, JoursFeriers.list("SELECT NEW org.acme.dto.conge.JoursFeriersDTO(j.id.day, j.id.month, COALESCE(NULLIF(j.id.year, '--'), '2025')) FROM JoursFeriers j"))).build();
    }

    @Path("/jours_feriers")
    @POST
    @Transactional
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response addJoursFeriers(JoursFeriersDTO joursFerier){
        congeService.addJoursFeriers(joursFerier);
        return Response.ok(new ApiResponseDTO(200, "Jours feriers ajouté avec succes", null, null)).build();
    }

    @Path("/ajout_solde")
    @POST
    @Transactional
    @RolesAllowed({RolePerson.RH_NAME, RolePerson.ADMIN_NAME})
    public Response addSolde(DemandeAjoutSoldeDTO dto, @Context SecurityContext ctx){
        congeService.addSoldeConge(dto, ctx);
        return Response.ok(new ApiResponseDTO(200, "Added "+dto.soldeAjouter+" jours au solde du "+dto.cin, null, null)).build();
    }
}
