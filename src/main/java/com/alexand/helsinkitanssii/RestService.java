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

    public String getEventsPlainJSON() throws Exception{
        String urlString = "http://open-api.myhelsinki.fi/v1/events/?tags_search=linkedevents%3Akulke%3A350%2Clinkedevents%3Akulke%3A32%2Clinkedevents%3Ayso%3Ap10105%2Clinkedevents%3Ayso%3Ap1278%2Clinkedevents%3Ayso%3Ap16584%2Clinkedevents%3Ayso%3Ap3984%2Clinkedevents%3Ayso%3Ap10216%2Clinkedevents%3Ayso%3Ap10218";

        try {
            URI url = new URI(urlString);
            ResponseEntity<String> response = this.restTemplate.getForEntity(url,String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            }
            throw new Exception("HTTP statuscode not 200");
        } catch (URISyntaxException e) {
            System.out.println("URL is not valid - URSyntax Exception :" +e.getMessage());
            throw new Exception("URL is not valid");
        } catch (Exception e) {
            if(e instanceof HttpStatusCodeException){
                String responseText=((HttpStatusCodeException)e).getResponseBodyAsString();
                System.out.println("Exception :" +responseText);
                return responseText;
            } else {
                throw new Exception("URL is not valid");
            }
        }
    }
}
