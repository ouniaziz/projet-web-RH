package org.acme.dto.response;

public record LoginResponseDTO(String role, String nom, String cin, String accessToken, String refreshToken) {
}
