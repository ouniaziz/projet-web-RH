package org.acme.DTO.Auth;

public class LoginResponseDTO {
    public String accessToken;
    public String refreshToken;
    public LoginResponseDTO(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}
