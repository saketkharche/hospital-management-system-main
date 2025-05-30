package com.hospital.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.request.LoginRequest;
import com.hospital.security.JwtTokenUtil;
import com.hospital.service.PatientService;

@RestController
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private PatientService patientService;

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        
        System.err.println("Attempting to authenticate user with email: {}"+ email);
        System.err.println("Received password (masked):{}"+ password);

        // Logging input credentials
        logger.info("Attempting to authenticate user with email: {}", email);
        logger.info("Received password (masked): {}", password != null ? "[PROVIDED]" : "[NOT PROVIDED]");

        // Validate input
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            logger.error("Email or password is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password must not be empty.");
        }

        try {
            // Attempt authentication
            logger.info("Authenticating user with Spring Security...");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // If authentication is successful, set the context
            SecurityContextHolder.getContext().setAuthentication(authentication);
            logger.info("Authentication successful for user: {}", email);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.isEmpty() ? "" : authorities.iterator().next().getAuthority();

            // Generate JWT token
            String token = jwtTokenUtil.generateToken(userDetails,role);
            logger.info("JWT Token generated successfully for user: {}", userDetails.getUsername());

            // Prepare the response
            Map<String, Object> response = new HashMap<>();
            response.put("email", userDetails.getUsername());
            response.put("role", role);
            response.put("token", token);

            // Check user role and fetch additional details if patient
//            if ("ROLE_PATIENT".equals(role)) {
//                logger.info("Fetching patient details for email: {}", userDetails.getUsername());
//                PatientResponse patientResponse = patientService.getPatientByEmail(userDetails.getUsername());
//                response.put("patientDetails", patientResponse);
//            } else if ("ROLE_ADMIN".equals(role)) {
//                response.put("message", "Welcome Admin");
//            }

            logger.info("Response: {}", response);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Authentication failed for user: {}. Error: {}", email, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }
    }
}
