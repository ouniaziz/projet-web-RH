package org.acme.dto.auth;

public record RefreshResponseDTO(String accessToken, String refreshToken) {
}
