package com.alexand.helsinkitanssii;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLOutput;

@RestController
public class EventController {

    private final RestService restService;

    public EventController(RestService restService) {
        this.restService = restService;
    }

    @GetMapping("/api/v1/events")
    public String getEvents() {
        try {
            String result = restService.getEventsPlainJSON();
            return result;
        } catch (Exception e) {
            System.out.println("Error: "+ e);
            return null;
        }

    }
}
