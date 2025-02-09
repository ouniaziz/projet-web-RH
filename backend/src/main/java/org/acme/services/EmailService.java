package org.acme.services;

import java.util.Map;

import org.apache.camel.ProducerTemplate;


import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class EmailService {

    @Inject
    ProducerTemplate producerTemplate;

    public void sendEmail(String recipient, String subject, String msg) {
        producerTemplate.sendBodyAndHeaders("direct:sendMail", msg,
            Map.of(
                "To", recipient,
                "From", "quarkus.java.bot@outlook.com",
                "Subject", subject
            ));
    }
}
