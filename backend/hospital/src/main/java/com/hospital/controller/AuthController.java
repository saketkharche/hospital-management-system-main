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
import com.hospital.dto.response.DoctorResponse;
import com.hospital.security.JwtTokenUtil;
import com.hospital.service.DoctorService;  // <-- inject your doctor service

@RestController
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private DoctorService doctorService;  // inject this to fetch doctor details

	@PostMapping("/api/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		logger.info("Attempting to authenticate user with email: {}", email);

		if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
			logger.error("Email or password is empty");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password must not be empty.");
		}

		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(email, password));

			SecurityContextHolder.getContext().setAuthentication(authentication);
			logger.info("Authentication successful for user: {}", email);

			UserDetails userDetails = (UserDetails) authentication.getPrincipal();
			Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
			String role = authorities.isEmpty() ? "" : authorities.iterator().next().getAuthority();

			String token = jwtTokenUtil.generateToken(userDetails, role);
			logger.info("JWT Token generated successfully for user: {}", userDetails.getUsername());

			Map<String, Object> response = new HashMap<>();
			response.put("email", userDetails.getUsername());
			response.put("role", role);
			response.put("token", token);

			// Fetch doctor name if role is doctor (optional: you can do for others similarly)
			if ("ROLE_DOCTOR".equals(role)) {
				DoctorResponse doctor = doctorService.fetchDoctorByEmail(email);
				if (doctor != null) {
					String doctorName = "Dr. " + doctor.getFirstName() + " " + doctor.getLastName();
					response.put("doctorName", doctorName);
				}
			}

			return ResponseEntity.ok(response);

		} catch (Exception e) {
			logger.error("Authentication failed for user: {}. Error: {}", email, e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
		}
	}
}
