package org.acme.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.acme.interfaces.BrevoTemplate;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import sendinblue.ApiClient;
import sendinblue.ApiException;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

@ApplicationScoped
public class BrevoService {
private final TransactionalEmailsApi apiInstance;

    public BrevoService() {
        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKey = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKey.setApiKey("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");
        this.apiInstance = new TransactionalEmailsApi(defaultClient);
    }

    public void sendActivateAccountEmail(String toEmail, String subject, BrevoTemplate brevoTemplate) throws ApiException {
        SendSmtpEmailSender sender = new SendSmtpEmailSender();
        sender.setEmail("med.2yassine.kharrat@gmail.com");
        sender.setName("Kharrats Evil Inc");

        SendSmtpEmailTo to = new SendSmtpEmailTo();
        to.setEmail(toEmail);
        //to.setName(toName);

        List<SendSmtpEmailTo> toList = new ArrayList<>();
        toList.add(to);

        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.setSender(sender);
        sendSmtpEmail.setTo(toList);
        sendSmtpEmail.setSubject(subject);
        sendSmtpEmail.setTemplateId(brevoTemplate.template());
        sendSmtpEmail.setParams(brevoTemplate.params());

        apiInstance.sendTransacEmail(sendSmtpEmail);
    }
}
