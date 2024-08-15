package com.johnabbott.medical_system.config;

import com.johnabbott.medical_system.entity.Appointment;
import com.johnabbott.medical_system.entity.Doctor;
import com.johnabbott.medical_system.entity.Patient;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    private String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT
        };

        config.exposeIdsFor(Patient.class, Doctor.class, Appointment.class);
        disableHttpMethods(Patient.class, config, theUnsupportedActions);
        disableHttpMethods(Doctor.class, config, theUnsupportedActions);
        disableHttpMethods(Appointment.class, config,theUnsupportedActions);
        /* Configure CORS Mapping */
        cors.addMapping("/**")
                .allowedOrigins(theAllowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    private void disableHttpMethods(Class<?> theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }
}
