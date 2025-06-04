package com.hospital.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.entity.Appointment;
import com.hospital.enums.Status;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.AppointmentRepository;
import com.hospital.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	/**
	 * 🏥 **Patient Side:** Create a new appointment.
	 */
	@Override
	public Appointment createAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	/**
	 * 🩺 **Doctor Side:** Fetch all appointments assigned to a specific doctor.
	 */
	@Override
	public List<Appointment> getAppointmentsByDoctorName(String doctorName) {
		return appointmentRepository.findByDoctorName(doctorName);
	}

	/**
	 * 🏥 **Patient Side:** Fetch appointments for a specific patient using name.
	 */
	@Override
	public List<Appointment> getAppointmentsByPatientName(String patientName) {
		return appointmentRepository.findByPatientName(patientName);
	}

	/**
	 * 🏥 **Patient Side:** Fetch appointments for a specific patient using email.
	 */
	@Override
	public List<Appointment> getAppointmentsByPatientEmail(String email) {
		return appointmentRepository.findByPatientEmail(email);
	}

	/**
	 * 🛠 **Admin Side:** Fetch all appointments.
	 */
	@Override
	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAll();
	}

	/**
	 * 👨‍⚕️ **Doctor Side:** Modify appointment status (Approve, Reject,
	 * Completed).
	 */
	@Override
	public Appointment updateAppointmentStatus(Long id, String status) {
		Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
		if (!appointmentOpt.isPresent()) {
			throw new ResourceNotFoundException("Appointment not found with ID: " + id);
		}

		Appointment appointment = appointmentOpt.get();
		appointment.setStatus(Status.valueOf(status.toUpperCase())); // Convert status to Enum
		return appointmentRepository.save(appointment);
	}
}