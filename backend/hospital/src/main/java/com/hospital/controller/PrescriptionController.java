package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.request.PrescriptionRequest;
import com.hospital.dto.response.PrescriptionResponse;
import com.hospital.service.PrescriptionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

	@Autowired
	private PrescriptionService prescriptionService;

	// 📝 Issue a new prescription (Doctor only)
	@PostMapping("/issue")
	@PreAuthorize("hasAuthority('ROLE_DOCTOR')")
	public ResponseEntity<PrescriptionResponse> issuePrescription(@Valid @RequestBody PrescriptionRequest request) {
		PrescriptionResponse response = prescriptionService.createPrescription(request);
		return ResponseEntity.ok(response);
	}

	// 📋 Get prescriptions for the logged-in patient
	@GetMapping("/my-prescriptions")
	@PreAuthorize("hasAuthority('ROLE_PATIENT')")
	public ResponseEntity<List<PrescriptionResponse>> getPrescriptionsForLoggedInPatient(
			@AuthenticationPrincipal UserDetails userDetails) {

		String email = userDetails.getUsername(); // Extract logged-in user's email
		System.out.println("Authenticated user email: " + email); // Debugging log

		List<PrescriptionResponse> prescriptions = prescriptionService.getPrescriptionsByPatient(email);

		System.out.println("Prescriptions fetched: " + prescriptions.size()); // Debugging log

		return ResponseEntity.ok(prescriptions);
	}

	// 🧾 Get prescription by ID (Admin/Doctor/Patient)
	@GetMapping("/{id}")
	public ResponseEntity<PrescriptionResponse> getPrescriptionById(@PathVariable Long id) {
		PrescriptionResponse response = prescriptionService.getPrescriptionById(id);
		return ResponseEntity.ok(response);
	}

	// 📋 Get all prescriptions (Admin only)
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<PrescriptionResponse>> getAllPrescriptions() {
		List<PrescriptionResponse> prescriptions = prescriptionService.getAllPrescriptions();
		return ResponseEntity.ok(prescriptions);
	}

	// 🗑 Delete prescription (Admin or Doctor who issued it)
	@DeleteMapping("/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_DOCTOR')")
	public ResponseEntity<Void> deletePrescription(@PathVariable Long id) {
		boolean deleted = prescriptionService.deletePrescription(id);
		return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
	}
}