package org.acme.dto;


import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class PersonDTO {
    public Optional<String> cin = Optional.empty();
    public Optional<String> nom= Optional.empty();
    public Optional<String> prenom= Optional.empty();
    public Optional<String> sexe= Optional.empty();
    public Optional<LocalDate> dateN= Optional.empty();
    public Optional<Integer> anciennete = Optional.empty();
    public Optional<String> image = Optional.empty();
    public Optional<String> email= Optional.empty();
    public Optional<Long> roleId= Optional.empty();  // RolePerson ID
    public Optional<Long> gradId= Optional.empty();
    public Optional<String> telephone = Optional.empty();
    public Optional<String> adresse = Optional.empty();
    public Optional<String> departement = Optional.empty();
    public Optional<List<HandicapPersonDTO>> handicaps = Optional.empty(); // we'll map them using person's cin and the handicapsId

    public PersonDTO() {
    }
    
}
