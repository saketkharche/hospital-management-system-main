package com.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hospital.dto.response.AppointmentWithDoctorDTO;
import com.hospital.entity.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	/**
	 * 🏥 Fetch Appointments by Patient Name
	 */
	@Query("SELECT a FROM Appointment a WHERE a.patientName = :name")
	List<Appointment> findByPatientName(@Param("name") String patientName);

	/**
	 * 📧 Fetch Appointments by Patient Email
	 */
	@Query("SELECT a FROM Appointment a WHERE a.patientEmail = :email")
	List<Appointment> findByPatientEmail(@Param("email") String patientEmail);

	/**
	 * 🩺 Fetch Appointments Assigned to a Doctor (by doctorName)
	 */
	@Query("SELECT a FROM Appointment a WHERE a.doctorName = :doctorName")
	List<Appointment> findByDoctorName(@Param("doctorName") String doctorName);

	/**
	 * 🔁 Fetch Appointments with Full Doctor Details Uses: appointments.doctorName
	 * = doctors.email
	 */
	@Query("SELECT new com.hospital.dto.response.AppointmentWithDoctorDTO("
			+ "a.id, a.patientName, a.patientEmail, a.date, a.time, a.status, "
			+ "d.firstName, d.lastName, d.email, d.specialization) "
			+ "FROM Appointment a JOIN Doctor d ON a.doctorName = d.email " + "WHERE a.patientEmail = :email")
	List<AppointmentWithDoctorDTO> findWithDoctorDetailsByPatientEmail(@Param("email") String email);

	/**
	 * 🕰️ Fetch Appointments by Status
	 */
	@Query("SELECT a FROM Appointment a WHERE a.status = :status")
	List<Appointment> findByStatus(@Param("status") String status);

	/**
	 * 📅 Fetch Appointments by Date
	 */
	@Query("SELECT a FROM Appointment a WHERE a.date = :date")
	List<Appointment> findByDate(@Param("date") String date);

	/**
	 * 🔍 Fetch Appointments by Patient Email and Status
	 */
	@Query("SELECT a FROM Appointment a WHERE a.patientEmail = :email AND a.status = :status")
	List<Appointment> findByEmailAndStatus(@Param("email") String email, @Param("status") String status);

	/**
	 * 🔄 Fetch All Appointments with Doctor Info (for Doctor Dashboard)
	 */
	@Query("SELECT new com.hospital.dto.response.AppointmentWithDoctorDTO("
			+ "a.id, a.patientName, a.patientEmail, a.date, a.time, a.status, "
			+ "d.firstName, d.lastName, d.email, d.specialization) "
			+ "FROM Appointment a JOIN Doctor d ON a.doctorName = d.email")
	List<AppointmentWithDoctorDTO> findAllWithDoctorDetails();

	/**
	 * 🩺 Fetch Appointments by Doctor Email (used in DoctorController)
	 */
	@Query("SELECT a FROM Appointment a WHERE a.doctorName = :doctorEmail")
	List<Appointment> findByDoctorEmail(@Param("doctorEmail") String doctorEmail);
}