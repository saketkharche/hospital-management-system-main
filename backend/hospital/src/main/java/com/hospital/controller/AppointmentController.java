package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.request.AppointmentRequest;
import com.hospital.dto.response.AppointmentWithDoctorDTO;
import com.hospital.entity.Appointment;
import com.hospital.enums.Status;
import com.hospital.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	/**
	 * 🏥 **Patient Side:** Fetch appointments for the logged-in patient.
	 */
	@GetMapping("/my-appointments")
	public ResponseEntity<List<Appointment>> getUserAppointments(@AuthenticationPrincipal UserDetails userDetails) {
		String email = userDetails.getUsername(); // email from JWT/session
		List<Appointment> appointments = appointmentService.getAppointmentsByPatientEmail(email);
		return ResponseEntity.ok(appointments);
	}

	/**
	 * 🩺 **Doctor Side:** Fetch appointments assigned to the logged-in doctor.
	 */
	@GetMapping("/doctor-appointments")
	public ResponseEntity<List<Appointment>> getDoctorAppointments(@AuthenticationPrincipal UserDetails userDetails) {
		String doctorName = userDetails.getUsername();
		List<Appointment> appointments = appointmentService.getAppointmentsByDoctorName(doctorName);
		return ResponseEntity.ok(appointments);
	}

	/**
	 * 👨‍⚕️ **Doctor Side:** Modify appointment status (Approve, Reject,
	 * Completed).
	 */
	@PutMapping("/{id}/status")
	public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable Long id, @RequestParam String status) {
		Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, status);
		return ResponseEntity.ok(updatedAppointment);
	}

	@GetMapping("/my-appointments/details")
	public ResponseEntity<List<AppointmentWithDoctorDTO>> getUserAppointmentsWithDoctorDetails(
			@AuthenticationPrincipal UserDetails userDetails) {
		String email = userDetails.getUsername();
		List<AppointmentWithDoctorDTO> appointments = appointmentService.getAppointmentsWithDoctorDetailsByEmail(email);
		return ResponseEntity.ok(appointments);
	}

	/**
	 * 🛠 **Admin Side:** Fetch all appointments.
	 */
	@GetMapping("/all")
	public ResponseEntity<List<Appointment>> getAllAppointments() {
		return ResponseEntity.ok(appointmentService.getAllAppointments());
	}

	/**
	 * 🏥 **Patient Side:** Create a new appointment with email support.
	 */
	@PostMapping
	public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest request,
			@AuthenticationPrincipal UserDetails userDetails) {
		// Instead of relying on the frontend, get the authenticated user's email
		// directly
		String authenticatedEmail = userDetails.getUsername();

		Appointment appointment = new Appointment();
		appointment.setPatientName(request.getPatientName());
		appointment.setPatientEmail(authenticatedEmail); // Use authenticated email
		appointment.setDoctorName(request.getDoctorName());
		appointment.setDate(request.getDate());
		appointment.setTime(request.getTime());
		appointment.setStatus(Status.PENDING); // Default status

		return new ResponseEntity<>(appointmentService.createAppointment(appointment), HttpStatus.CREATED);
	}
}