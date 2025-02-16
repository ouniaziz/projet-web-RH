package org.acme.DTO;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record PersonStatusDTO(int status_p){}
