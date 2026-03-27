package com.hotel.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Override
    public void run(String... args) {
        // Default admin logic removed as per user request.
        // Admins will now be created via the public registration endpoint.
    }
}
