package org.acme.dto.auth;

public record PasswordResetRequestDTO(String password, String token){}
