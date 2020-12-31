package com.alexand.helsinkitanssii;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    private final RestService restService;

    public EventController(RestService restService) {
        this.restService = restService;
    }

    @GetMapping("/api/v1/events")
    public String getEvents() {
        String result = restService.getEventsPlainJSON();
        System.out.printf(result);
        return result;
    }
}
