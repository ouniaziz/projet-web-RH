package org.acme.services;

import org.apache.camel.builder.RouteBuilder;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MailRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("direct:sendMail") // This endpoint triggers sending an email
            .to("smtp://smtp.office365.com?username=quarkus.java.bot@outlook.com&password=crothoimsvrvteqf&port=587&startTls=true")
            .log("Email sent successfully");
    }
}

