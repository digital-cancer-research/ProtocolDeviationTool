package org.digitalecmt.qualityassurance;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.ldap.core.ContextSource;
import org.springframework.ldap.core.support.BaseLdapPathContextSource;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.ldap.EmbeddedLdapServerContextSourceFactoryBean;
import org.springframework.security.config.ldap.LdapBindAuthenticationManagerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
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
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.azure.spring.cloud.autoconfigure.implementation.aad.security.AadWebApplicationHttpSecurityConfigurer;

import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {
	
    @Value("${security.ldap.url}")
    private String ldapUrl;
	@Value("${security.ldap.base}")
    private String ldapBase;
    @Value("${security.ldap.user-dn-pattern}")
    private String ldapUserDn;
    
    @Value("${app.protect.authenticated}")
    private String[] allowedOrigins;

    @Bean
    @Profile("LDAP")
    public LdapAuthenticationProvider ldapAuthenticationProvider() throws Exception {
        return new LdapAuthenticationProvider(ldapAuthenticator(), ldapAuthoritiesPopulator());
    }

    @Bean
    @Profile("LDAP")
    public LdapContextSource ldapContextSource() throws Exception {
        DefaultSpringSecurityContextSource contextSource = new DefaultSpringSecurityContextSource(ldapUrl);
		contextSource.setBase(ldapBase);
        return contextSource;
    }

    @Bean
    @Profile("LDAP")
    public LdapAuthenticator ldapAuthenticator() throws Exception {
        BindAuthenticator authenticator = new BindAuthenticator(ldapContextSource());
        authenticator.setUserDnPatterns(new String[] { "cn={0},"+ldapUserDn });

        return authenticator;
    }

    @Bean
    @Profile("LDAP")
    public LdapAuthoritiesPopulator ldapAuthoritiesPopulator() throws Exception {
        return new DefaultLdapAuthoritiesPopulator(ldapContextSource(), null);
    }
    
//    @Bean
//    @Profile("LDAP")
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//    	http
//    		.formLogin(Customizer.withDefaults());
//    	return http.build();
//    }
    
    @Bean
    @Profile("Entra")
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	System.out.println(allowedOrigins);
        http.apply(AadWebApplicationHttpSecurityConfigurer.aadWebApplication());
        http.authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
                );
        return http.build();
    }

    @Bean
    @RequestScope
//    @Profile("Entra")
    public ServletUriComponentsBuilder urlBuilder() {
        return ServletUriComponentsBuilder.fromCurrentRequest();
    }    

    

}
