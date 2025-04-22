package org.acme.resources;

import jakarta.ws.rs.*;
import org.acme.dto.response.ApiResponseDTO;
import org.acme.dto.PersonDTO;
import org.acme.entities.Person;
import org.acme.services.PersonService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import sendinblue.ApiException;

@Path("/api/persons")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
/* TODO: Ask chatbot how to integrate realtime notification manager that's fired upon every modification made to the Person's data
   TODO: Don't forget to turn addPerson from String into void
   TODO: use SimplePersonResponseDTO for fetching large-scale data for DataGrid
   TODO: Add CRUD for parameters like Grad, Handicaps, Roles, Exercice

   TODO: URGENT reactivate RolesAllowed before submitting!!
 * replace java-jwt dependency with smallrye-jwt when necessary since it integrates well with quarkus.
*/
public class PersonResource {
    
    @Inject PersonService personService;


    @POST
    @Transactional
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response addPerson(PersonDTO personDTO){
        try{
            String token = personService.addPerson(personDTO);
            ApiResponseDTO apiResponse = new ApiResponseDTO(201, "Added person whose cin = "+personDTO.cin.get()+ " to database", null, token);
            return Response.status(Response.Status.CREATED).entity(apiResponse).build();
        }catch(ApiException e){

            return Response.status(500).entity(new ApiResponseDTO(500, null, "Server error occured", e.getMessage())).build();
        }
    }

/*
    @GET
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response getPersonsByFilters(@DefaultValue("-1")   @RestQuery int grad,
                                        @RestQuery String sexe,
                                        @DefaultValue("-1")   @RestQuery int anciennete,
                                        @RestQuery String actif,
                                        @DefaultValue("-1")   @RestQuery int handicap){

        return Response.ok(new ApiResponseDTO(200, "Filtered successfully", null, personService.filterRecords(sexe,grad,anciennete,handicap, actif))).build();
    }
*/
    @DELETE
    @Path("/{cin}")
    @Transactional
    //@RolesAllowed("**")
    public Response deletePerson(@PathParam("cin") String cin, @Context SecurityContext ctx){
        if(personService.deletePerson(cin, ctx))
            return Response.ok().build();
        return Response.status(400).build();
    }

    @GET
    @Path("/employe")
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response getEmployes(){
        return Response.ok().entity(new ApiResponseDTO(200,null,null,personService.getEmployers())).build();
    }

    @GET
    @Path("/enseignant")
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response getEnseignants(){
        return Response.ok().entity(new ApiResponseDTO(200,null,null,personService.getEnseignant())).build();
    }


    // Get person by Id
    @GET
    @Path("/{cin}")
    //@RolesAllowed("**") // similar to @Authenticated
    public Response getDetailedPersonById(@PathParam(value = "cin") String cin, @Context SecurityContext ctx){
        Person p = personService.getPerson(cin, ctx);
        return Response.ok().entity(new ApiResponseDTO(200, null, null, p)).build();
    }

    @PUT
    @Path("/update")
    @Transactional
    //@RolesAllowed("**")
    public Response modifyPerson(PersonDTO personDto, @Context SecurityContext ctx){
        personService.modifyPerson(personDto, ctx);
        return Response.status(200).entity(new ApiResponseDTO(200, "Modified person "+personDto.cin.get()+" successfully", null, null)).build();
    }

    // For test only
    @GET
    @Path("/all")
    //RolseAllowed({"Personnel RH", "Admin"})
    public Response getAll(){
        return Response.ok(new ApiResponseDTO(200,"Fetched records successfully",null,personService.getPersons())).build();
    }


}
