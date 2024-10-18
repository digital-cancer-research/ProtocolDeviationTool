package org.digitalecmt.qualityassurance;

import org.apache.tomcat.util.buf.EncodedSolidusHandling;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class App extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> tomcatCustomiser() {
        return factory -> factory.addConnectorCustomizers(connector -> connector.setEncodedSolidusHandling(
                EncodedSolidusHandling.DECODE.getValue()));
    }
}