package org.digitalecmt.qualityassurance;

import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.context.annotation.Bean;

@Configuration
public class LdapConfig {

    @Bean
    public LdapContextSource contextSource() {
        LdapContextSource ldapContextSource = new LdapContextSource();
        ldapContextSource.setUrl("ldaps://ldap.manchester.ac.uk");
        ldapContextSource.setBase("ou=uman,o=ac,c=uk");
        ldapContextSource.setUserDn("ou=uman,o=ac,c=uk");
        ldapContextSource.setPassword(""); // Adjust if necessary
        ldapContextSource.setPooled(true);
        return ldapContextSource;
    }
}
