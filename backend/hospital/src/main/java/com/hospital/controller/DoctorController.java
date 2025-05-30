package com.hospital.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.hospital.dto.request.DoctorRequest;
import com.hospital.dto.response.DoctorResponse;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.security.SecurityUtil;
import com.hospital.service.DoctorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

	private static final Logger logger = LoggerFactory.getLogger(DoctorController.class);

	@Autowired
	private DoctorService doctorService;

	@Autowired
	private  SecurityUtil securityUtil;

	@PostMapping("/registerDoctor")
	public ResponseEntity<?> registerDoctor(@Valid @RequestBody DoctorRequest request) {
		try {
			DoctorResponse response = doctorService.registerDoctor(request);
			return ResponseEntity.ok(response);
		} catch (EmailAlreadyExistsException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
		} catch (Exception e) {
			logger.error("Error registering doctor: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An unexpected error occurred: " + e.getMessage());
		}
	}

	@GetMapping("/fetchAllDoctors")
	public ResponseEntity<?> getAllDoctors() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (!securityUtil.isAdmin(authentication)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. Only administrators can access this resource.");
			}

			List<DoctorResponse> doctorResponses = doctorService.fetchAllDoctors();
			return ResponseEntity.ok(doctorResponses);
		} catch (Exception e) {
			logger.error("Error fetching all doctors: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching doctor details: " + e.getMessage());
		}
	}

	@GetMapping("/details/{email}")
	public ResponseEntity<?> getDoctorDetails(@PathVariable String email) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only view your own details.");
			}

			DoctorResponse doctor = doctorService.fetchDoctorByEmail(email);
			if (doctor == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found with email: " + email);
			}

			return ResponseEntity.ok(doctor);
		} catch (Exception e) {
			logger.error("Error fetching doctor details: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching doctor details");
		}
	}

	@GetMapping("/mydetails")
	public ResponseEntity<?> getMyDetails() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String email = ((UserDetails) authentication.getPrincipal()).getUsername();

			DoctorResponse doctor = doctorService.fetchDoctorByEmail(email);
			if (doctor == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor details not found");
			}

			return ResponseEntity.ok(doctor);
		} catch (Exception e) {
			logger.error("Error fetching doctor details: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while fetching your details");
		}
	}

	@PutMapping("/update/{email}")
	public ResponseEntity<?> updateDoctor(@PathVariable String email,
			@Valid @RequestBody DoctorResponse updatedDoctor) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only update your own details.");
			}

			DoctorResponse updated = doctorService.updateDoctor(email, updatedDoctor);
			return ResponseEntity.ok(updated);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid data provided: " + e.getMessage());
		} catch (Exception e) {
			logger.error("Error updating doctor: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while updating doctor details");
		}
	}

	@DeleteMapping("/delete/{email}")
	public ResponseEntity<?> deleteDoctor(@PathVariable String email) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			if (!securityUtil.isAdmin(authentication) && !userDetails.getUsername().equals(email)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN)
						.body("Access denied. You can only delete your own details.");
			}

			boolean deleted = doctorService.deleteDoctor(email);

			if (deleted) {
				return ResponseEntity.ok("Doctor deleted successfully.");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found with the provided email.");
			}
		} catch (Exception e) {
			logger.error("Error deleting doctor: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while deleting doctor details.");
		}
	}

}
