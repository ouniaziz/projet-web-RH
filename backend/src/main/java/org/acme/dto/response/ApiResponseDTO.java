package org.acme.dto.response;

public class ApiResponseDTO {
    public int status;
    public String message;
    public String error;
    public Object data;

    public ApiResponseDTO(int status, String message, String error, Object data) {
        this.status = status;
        this.message = message;
        this.error = error;
        this.data = data;
    }
}
