package org.acme.resources;

import org.acme.DTO.ApiResponseDTO;
import org.acme.DTO.PersonDTO;
import org.acme.services.EmailService;
import org.acme.services.PersonService;

import io.smallrye.common.annotation.Blocking;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/api/persons")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PersonResource {
    
    @Inject PersonService personService;
    @Inject EmailService emailService;

    @GET   
    @Path("/send")                                                             
    @Blocking                                                           
    public void sendEmail() {
        emailService.sendEmail("mohamedyacine.kharrat@isimm.u-monastir.tn", "Subject: Sub, from quarkus", "Hey fella");
    }


    @POST
    @Transactional
    public Response addPerson(PersonDTO personDTO){
        personService.addPerson(personDTO);
        ApiResponseDTO apiResponse = new ApiResponseDTO(201, "Added person whose cin = "+personDTO.cin+ " to database", null, null);
        return Response.status(Response.Status.CREATED).entity(apiResponse).build();
    }
}
