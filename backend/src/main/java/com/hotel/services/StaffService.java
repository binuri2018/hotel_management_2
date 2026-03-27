package com.hotel.services;

import com.hotel.models.User;
import com.hotel.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<User> getStaffOnly() {
        return userRepository.findByRole("STAFF");
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User updateUser(Long id, User updatedUser) {
        User user = getUserById(id);
        if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
            // Check if username is taken by another user
            userRepository.findByUsername(updatedUser.getUsername())
                    .filter(u -> !u.getId().equals(id))
                    .ifPresent(u -> { throw new RuntimeException("Username already taken"); });
            user.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null) {
            if (!updatedUser.getEmail().isEmpty()) {
                userRepository.findByEmail(updatedUser.getEmail())
                        .filter(u -> !u.getId().equals(id))
                        .ifPresent(u -> { throw new RuntimeException("Email already taken"); });
            }
            user.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getRole() != null && !updatedUser.getRole().isEmpty()) {
            if (!updatedUser.getRole().equals("ADMIN") && !updatedUser.getRole().equals("STAFF")) {
                throw new RuntimeException("Invalid role. Must be ADMIN or STAFF");
            }
            user.setRole(updatedUser.getRole());
        }
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
