package org.acme.dto.response;

import io.quarkus.runtime.annotations.RegisterForReflection;
import org.acme.entities.grad.GradPerson;

import java.time.LocalDate;

public record SimplePersonResponseDTO (String cin, String nom, String prenom, String sexe,
                                       Integer status, LocalDate dateN, String email, Integer anciennete, String role,
                                       String grad, Boolean hasHandicaps, String image){}