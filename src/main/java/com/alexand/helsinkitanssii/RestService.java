package com.alexand.helsinkitanssii;


import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
public class RestService {

    private final RestTemplate restTemplate;

    public RestService (RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public String getEventsPlainJSON() {
        String urlString = "http://open-api.myhelsinki.fi/v1/event/kulke%3A53544";

        try {
            URI url = new URI(urlString);
            ResponseEntity<String> response = this.restTemplate.getForEntity(url,String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println(response.getBody());
                return response.getBody();
            }
            return "Not status ok";
        } catch (URISyntaxException e) {
            return "URL is not valid";
        } catch (Exception e) {
            if(e instanceof HttpStatusCodeException){
                String responseText=((HttpStatusCodeException)e).getResponseBodyAsString();
                //now you have the response, construct json from it, and extract the errors
                System.out.println("Exception :" +responseText);
            }
            return "Caught an exception " + e.getMessage();
        }
    }
}
