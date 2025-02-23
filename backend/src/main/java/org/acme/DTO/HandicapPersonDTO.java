package org.acme.DTO;

public class HandicapPersonDTO {
    public int id;
    public String severity;
    public String assistiveDevice;

    public HandicapPersonDTO(int id, String severity, String assistiveDevice) {
        this.id = id;
        this.severity = severity;
        this.assistiveDevice = assistiveDevice;
    }
    
}
