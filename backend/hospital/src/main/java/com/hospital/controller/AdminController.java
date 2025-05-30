package com.hospital.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.response.AdminResponse;
import com.hospital.security.JwtTokenUtil;
import com.hospital.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	

	@Autowired
	private AdminService adminService;

	@Autowired
	private JwtTokenUtil jwtUtil;

	private String extractEmailFromToken(String token) {
		if (token.startsWith("Bearer ")) {
			token = token.substring(7); // Remove "Bearer " prefix
		}
		return jwtUtil.extractUsername(token);
	}

	@GetMapping("/dashboard")
	public String getAdminDashboard() {
		return "Welcome to the Admin Dashboard";
	}

	@GetMapping("/details")
	public ResponseEntity<AdminResponse> getAdminDetails(@RequestHeader("Authorization") String token) {
		logger.debug("Received request to get patient details");

		logger.debug("Authorization token: {}", token);

		String email = extractEmailFromToken(token);
		logger.debug("Extracted email from token: {}", email);

		AdminResponse admin = adminService.getAdminData(email);

		if (admin != null) {
			logger.debug("Patient details found: {}", admin);
			return ResponseEntity.ok(admin);
		} else {
			logger.warn("No patient found for email: {}", email);
			return ResponseEntity.notFound().build();
		}
	}
	
	
}
