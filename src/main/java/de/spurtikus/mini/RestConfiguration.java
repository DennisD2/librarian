package de.spurtikus.mini;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.hateoas.MediaTypes;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.concurrent.TimeUnit;

// Simple @CrossOrigin annotation did not work.
// See https://stackoverflow.com/questions/31724994/spring-data-rest-and-cors/42403956#42403956

@Configuration
public class RestConfiguration extends RepositoryRestConfigurerAdapter {

        public static void applyFullCorsAllowedPolicy(CorsRegistry registry) {
            registry.addMapping("/**") //
                    .allowedOrigins("*") //
                    .allowedMethods("OPTIONS", "HEAD", "GET", "PUT", "POST", "DELETE", "PATCH") //
                    .allowedHeaders("*") //
                    .exposedHeaders("WWW-Authenticate") //
                    .allowCredentials(true)
                    .maxAge(TimeUnit.DAYS.toSeconds(1));
        }

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
            config.setReturnBodyOnCreate(true);
            config.setReturnBodyForPutAndPost(true);
            config.setReturnBodyOnUpdate(true);
            config.setMaxPageSize(250);
            config.setDefaultPageSize(50);
            config.setDefaultMediaType(MediaTypes.HAL_JSON);
            config.useHalAsDefaultJsonMediaType(true);

            applyFullCorsAllowedPolicy(config.getCorsRegistry());
        }

}