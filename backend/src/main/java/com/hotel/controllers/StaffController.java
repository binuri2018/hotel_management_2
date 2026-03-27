package com.hotel.controllers;

import com.hotel.models.User;
import com.hotel.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
@PreAuthorize("hasRole('ADMIN')")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<List<StaffResponse>> getAllUsers() {
        List<StaffResponse> users = staffService.getAllUsers().stream()
                .map(StaffResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffResponse> getUserById(@PathVariable Long id) {
        try {
            User user = staffService.getUserById(id);
            return ResponseEntity.ok(StaffResponse.from(user));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            User user = staffService.updateUser(id, updatedUser);
            return ResponseEntity.ok(StaffResponse.from(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            staffService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // Response DTO - never expose password
    private record StaffResponse(Long id, String username, String email, String role) {
        static StaffResponse from(User user) {
            return new StaffResponse(user.getId(), user.getUsername(), user.getEmail(), user.getRole());
        }
    }

    private record ErrorResponse(String message) {
    }
}
