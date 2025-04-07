package org.acme.entities.grad;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class GradPersonId implements Serializable {
    @Column(name = "grad_id")
    private Long gradId;

    private String cin;

    public GradPersonId() {

    }

    public Long getGradId() {
        return gradId;
    }

    public void setGradId(Long gradId) {
        this.gradId = gradId;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public GradPersonId(Long gradId, String cin) {
        this.gradId = gradId;
        this.cin = cin;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof GradPersonId that)) return false;
        return Objects.equals(gradId, that.gradId) && Objects.equals(cin, that.cin);
    }

    @Override
    public int hashCode() {
        return Objects.hash(gradId, cin);
    }
}
