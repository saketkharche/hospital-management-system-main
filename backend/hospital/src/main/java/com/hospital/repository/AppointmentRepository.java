package com.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hospital.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	/**
	 * 🏥 **Fetch Appointments by Patient Name**
	 */
	@Query("SELECT a FROM Appointment a WHERE a.patientName = :name")
	List<Appointment> findByPatientName(@Param("name") String patientName);

	/**
	 * 📧 **Fetch Appointments by Patient Email**
	 */
	@Query("SELECT a FROM Appointment a WHERE a.patientEmail = :email")
	List<Appointment> findByPatientEmail(@Param("email") String patientEmail);

	/**
	 * 🩺 **Fetch Appointments Assigned to a Doctor**
	 */
	@Query("SELECT a FROM Appointment a WHERE a.doctorName = :doctorName")
	List<Appointment> findByDoctorName(@Param("doctorName") String doctorName);
}