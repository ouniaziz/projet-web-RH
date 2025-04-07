package org.acme.dto.auth;

public record ActivationRequestDTO(String cin, String token, String password){}
