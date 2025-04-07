package org.acme.repositories;

import org.acme.entities.grad.Grad;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.acme.entities.grad.GradPerson;

import java.util.List;

@ApplicationScoped
public class GradPersonRepository implements PanacheRepository<GradPerson> {

}
