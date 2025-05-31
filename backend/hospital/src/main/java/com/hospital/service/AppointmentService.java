package com.hospital.service;

import java.util.List;

import com.hospital.entity.Appointment;

public interface AppointmentService {
	List<Appointment> getAllAppointments();

	Appointment createAppointment(Appointment appointment);
}
