package org.acme.resources;

import org.acme.DTO.ApiResponseDTO;
import org.acme.DTO.PersonDTO;
import org.acme.entities.Person;
import org.acme.services.PersonService;
import org.jboss.resteasy.reactive.RestQuery;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DefaultValue;
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
import sendinblue.ApiException;

@Path("/api/persons")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
/*  TODO: add CRUD to Persons

    TODO: Ask chatbot how to integrate realtime notification manager that's fired upon every modification made to the Person's data
 * 
 *  TODO: DELETE delete person

    TODO: Don't forget to turn addPerson from String into void
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

    @GET
    //@RolesAllowed({"Personnel RH", "Administrator"})
    public Response getPersonsByFilters(@DefaultValue("-1")   @RestQuery int grad,
                                        @RestQuery String sexe,
                                        @DefaultValue("-1")   @RestQuery int anciennete,
                                        @RestQuery String actif,
                                        @DefaultValue("-1")   @RestQuery int handicap){

        return Response.ok(new ApiResponseDTO(200, "Filtered successfully", null, personService.filterRecords(sexe,grad,anciennete,handicap, actif))).build();
    }

    @PUT
    @Path("/archive/{cin}")
    @Transactional
    //RolseAllowed({"Personnel RH", "Admin"})
    // We'll assume that person's status ==-1 ==> record is archived
    public Response archivePerson(@PathParam(value = "cin") String cin){
        personService.archivePerson(cin);
        return Response.accepted().entity(new ApiResponseDTO(202, "Person with cin ="+cin+" has been archived", null,null)).build();
    }
*/


    // Get person by Id
    @GET
    @Path("/{cin}")
    @RolesAllowed("**") // similar to @Authenticated
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
    @GET
    @Path("/all")
    //RolseAllowed({"Personnel RH", "Admin"})
    public Response getAll(){
        return Response.ok(new ApiResponseDTO(200,"Fetched records successfully",null,personService.getPersons())).build();
    }


}
