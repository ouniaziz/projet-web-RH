package org.acme.dto.auth;

public class LoginResponseDTO {
    public String accessToken;
    public String refreshToken;
    public LoginResponseDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
