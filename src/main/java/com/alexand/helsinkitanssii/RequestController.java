package com.alexand.helsinkitanssii;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RequestController {

    @GetMapping("/")
    @ResponseBody
    public String getIndex() {
        return "Hello world!";
    }
}
