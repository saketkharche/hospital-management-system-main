package com.hospital.service;

import java.util.List;

import com.hospital.entity.Appointment;

public interface AppointmentService {

	// 🔹 Admin Side: Fetch all appointments
	List<Appointment> getAllAppointments();

	// 🔹 Patient Side: Fetch appointments for a specific patient
	List<Appointment> getAppointmentsByPatientName(String patientName);

	// 🔹 Patient Side: Fetch appointments using email
	List<Appointment> getAppointmentsByPatientEmail(String patientEmail);

	// 🔹 Doctor Side: Fetch appointments assigned to a specific doctor
	List<Appointment> getAppointmentsByDoctorName(String doctorName);

	// 🔹 Patient Side: Create a new appointment
	Appointment createAppointment(Appointment appointment);

	// 🔹 Doctor Side: Update appointment status
	Appointment updateAppointmentStatus(Long id, String status);
}