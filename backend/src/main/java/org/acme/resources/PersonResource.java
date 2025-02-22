package org.acme.resources;

import java.util.concurrent.CompletionStage;

import org.acme.DTO.ApiResponseDTO;
import org.acme.DTO.PersonDTO;
import org.acme.brevo.services.BrevoService;
import org.acme.entities.Person;
import org.acme.services.PersonService;

import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/persons")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
/*  TODO: add CRUD to Persons

    TODO: Ask chatbot how to integrate realtime notification manager that's fired upon every modification made to the Person's data

 *  TODO:GET getPersonsByFilter, PUT modify person, POST add person, DELETE delete person
 * 
 * replace java-jwt dependency with smallrye-jwt when necessary since it integrates well with quarkus.
*/
public class PersonResource {
    
    @Inject PersonService personService;

    @POST
    @Transactional
    public Response addPerson(PersonDTO personDTO){
        try{
            personService.addPerson(personDTO);
            ApiResponseDTO apiResponse = new ApiResponseDTO(201, "Added person whose cin = "+personDTO.cin+ " to database", null, null);
            return Response.status(Response.Status.CREATED).entity(apiResponse).build();
        }catch(Exception e){
            return Response.status(500).entity(e).build();
        }
    }

    @GET
    @Path("/employe")
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response getEmployes(){
        return Response.ok().entity(new ApiResponseDTO(200,null,null,personService.getEmployers())).build();
    }

    @GET
    //@RolesAllowed({"Personnel RH", "Administrator"})
    @Path("/enseignant")
    @RolesAllowed({"Personnel RH"})
    public Response getEnseignants(){
        return Response.ok().entity(new ApiResponseDTO(200,null,null,personService.getEnseignant())).build();
    }

    // Get person by Id
    @GET
    @Path("/{cin}")
    @RolesAllowed("**") // similar to @Authenticated
    public Response getDetailedPersonById(@PathParam(value = "cin") String cin, @Context SecurityContext ctx){
        Person p = personService.getPerson(cin, ctx);
        return Response.ok().entity(new ApiResponseDTO(200, null, null, p)).build();
    }

    /* @PUT
    @Transactional
    public Response modifyPerson(PersonDTO personDto){
        personService.modifyPerson(personDto)
    
    
    
    } */
}
