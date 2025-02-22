package org.acme.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;

@Embeddable
public record HandicapPersonId(Long handicap_id, String cin) implements Serializable{}
