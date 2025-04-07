package org.acme.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.acme.dto.response.ApiResponseDTO;
import org.acme.dto.conge.DemandeCongeDTO;
import org.acme.dto.conge.TypeCongeDTO;
import org.acme.services.CongeService;

@Path("/api/conges")
public class CongeResource {
    @Inject
    CongeService congeService;

    @GET
    @Path("/types")
    public Response getTypesConge(){
        return Response.ok(new ApiResponseDTO(200,"Fetched Types conge successfully", null,congeService.getTypesConges())).build();
    }

    @POST
    @Path("/type")
    public Response addType(TypeCongeDTO type){
        congeService.createTypeConge(type);
        return Response.accepted(new ApiResponseDTO(201, "Type congé created successfully", null, null)).build();
    }

    @POST
    @Path("/demande")
    public Response addDemande(DemandeCongeDTO demande){
        congeService.createDemande(demande);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé created successfully", null, null)).build();
    }

    @PUT
    @Path("/demande/accept/{id}")
    public Response acceptDemande(@PathParam("id") Long demande_id){
        congeService.acceptConge(demande_id);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé id="+demande_id+ " accepted successfully", null, null)).build();
    }

    @PUT
    @Path("/demande/refuse/{id}")
    public Response refuseDemande(@PathParam("id") Long demande_id){
        congeService.refuseConge(demande_id);
        return Response.accepted(new ApiResponseDTO(201, "Demande congé id="+demande_id+ " refused successfully", null, null)).build();
    }
}
