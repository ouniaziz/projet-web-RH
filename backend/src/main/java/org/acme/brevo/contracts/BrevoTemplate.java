package org.acme.brevo.contracts;

import java.util.Map;

public interface BrevoTemplate{
    int ACCOUNT_ACTIVATION_TEMPLATE = 1;
    int PASSWORD_RESET_TEMPLATE=2;

    long template();
    Map<String, String> params();
}



