package org.digitalecmt.qualityassurance;

import org.springframework.context.annotation.Configuration;
import org.springframework.ldap.core.ContextSource;
import org.springframework.ldap.core.support.BaseLdapPathContextSource;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.ldap.EmbeddedLdapServerContextSourceFactoryBean;
import org.springframework.security.config.ldap.LdapBindAuthenticationManagerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;
import org.springframework.security.ldap.authentication.BindAuthenticator;
import org.springframework.security.ldap.authentication.LdapAuthenticationProvider;
import org.springframework.security.ldap.authentication.LdapAuthenticator;
import org.springframework.security.ldap.server.UnboundIdContainer;
import org.springframework.security.ldap.userdetails.DefaultLdapAuthoritiesPopulator;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class WebSecurityConfig {

    @Value("${security.ldap.url}")
    private String ldapUrl;
	@Value("${security.ldap.base}")
    private String ldapBase;
    @Value("${security.ldap.user-dn-pattern}")
    private String ldapUserDn;



    @Bean
    public LdapAuthenticationProvider ldapAuthenticationProvider() throws Exception {
        return new LdapAuthenticationProvider(ldapAuthenticator(), ldapAuthoritiesPopulator());
    }

    @Bean
    public LdapContextSource ldapContextSource() throws Exception {
        DefaultSpringSecurityContextSource contextSource = new DefaultSpringSecurityContextSource(ldapUrl);
		contextSource.setBase(ldapBase);
        return contextSource;
    }

    @Bean
    public LdapAuthenticator ldapAuthenticator() throws Exception {
        BindAuthenticator authenticator = new BindAuthenticator(ldapContextSource());
        authenticator.setUserDnPatterns(new String[] { "cn={0},"+ldapUserDn });

        return authenticator;
    }

    @Bean
    public LdapAuthoritiesPopulator ldapAuthoritiesPopulator() throws Exception {
        return new DefaultLdapAuthoritiesPopulator(ldapContextSource(), null);
    }


}

