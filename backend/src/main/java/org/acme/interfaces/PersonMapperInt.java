package org.acme.interfaces;

import org.acme.DTO.PersonDTO;
import org.acme.entities.Person;

/**
 * An interface to ensure entity-to-dto conversion and vice-versa
 */
public interface PersonMapperInt{
    PersonDTO toDto(Person entity);
    /**
     * Used to *create* a new Person record from the provided DTO
     * @param dto
     * @return New Person instance
     */
    Person toEntity(PersonDTO dto);
}

