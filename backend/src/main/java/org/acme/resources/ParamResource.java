package org.acme.resources;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.acme.dto.response.ApiResponseDTO;
import org.acme.entities.Department;
import org.acme.entities.grad.Grad;
import org.acme.entities.handicap.Handicap;

/*  TODO: ADD @GET to params: RolePerson, CRUD to Departement, Grad and Handicaps
    TODO: make handicaps dynamic, if there's no handicap, it's created on the spot!
 */
@Path("/api/params")
public class ParamResource {

    @Path("/grad")
    @GET
    //RolesAllowed(**)
    public Response getGrads(){
        return Response.ok(new ApiResponseDTO(200,"Fetched Grads", null, Grad.listAll())).build();
    }

    @Path("/handicap")
    @GET
    //RolesAllowed(**)
    public Response getHandicaps(){
        return Response.ok(new ApiResponseDTO(200,"Handicappe fetched", null, Handicap.listAll())).build();
    }

    @Path("/handicap")
    @POST
    @Transactional
    public Response addHandicap(Handicap handicap){
        Handicap.persist(handicap);
        return Response.ok(new ApiResponseDTO(200,"Handicap id="+handicap.getId_hand()+" added successfully", null, null)).build();
    }

    @Path("/departement")
    @GET
    //RolesAllowed(**)
    public Response getDepartement(){
        return Response.ok(new ApiResponseDTO(200,"Departements fetched", null, Department.list("SELECT d FROM Department d"))).build();
    }

}
