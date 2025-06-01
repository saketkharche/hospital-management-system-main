package com.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.dto.request.AppointmentRequest;
import com.hospital.entity.Appointment;
import com.hospital.enums.Status;
import com.hospital.service.AppointmentService;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@GetMapping
	public ResponseEntity<List<Appointment>> getAllAppointments() {
		return ResponseEntity.ok(appointmentService.getAllAppointments());
	}

	@PostMapping
	public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest request) {
		Appointment appointment = new Appointment();
		appointment.setPatientName(request.getPatientName());
		appointment.setDoctorName(request.getDoctorName());
		appointment.setDate(request.getDate());
		appointment.setTime(request.getTime());
		appointment.setStatus(Status.PENDING); // default status

		return new ResponseEntity<>(appointmentService.createAppointment(appointment), HttpStatus.CREATED);
	}
}
