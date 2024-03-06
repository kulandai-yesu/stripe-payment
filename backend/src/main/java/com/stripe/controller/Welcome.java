package com.stripe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Welcome {

    @GetMapping
    public String welcomeUser() {
        return "Hello, Welcome to our website";
    }
}
