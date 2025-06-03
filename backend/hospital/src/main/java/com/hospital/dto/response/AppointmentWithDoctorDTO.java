package com.hospital.dto.response;

public class AppointmentWithDoctorDTO {
	private Long id;
	private String patientName;
	private String patientEmail;
	private String date;
	private String time;
	private String status;
	private String doctorFirstName;
	private String doctorLastName;
	private String doctorEmail;
	private String specialization;

	// ✅ Required constructor for Hibernate
	public AppointmentWithDoctorDTO(Long id, String patientName, String patientEmail, String date, String time,
			String status, String doctorFirstName, String doctorLastName, String doctorEmail, String specialization) {
		this.id = id;
		this.patientName = patientName;
		this.patientEmail = patientEmail;
		this.date = date;
		this.time = time;
		this.status = status;
		this.doctorFirstName = doctorFirstName;
		this.doctorLastName = doctorLastName;
		this.doctorEmail = doctorEmail;
		this.specialization = specialization;
	}

	// Getters (required for JSON serialization)
	public Long getId() {
		return id;
	}

	public String getPatientName() {
		return patientName;
	}

	public String getPatientEmail() {
		return patientEmail;
	}

	public String getDate() {
		return date;
	}

	public String getTime() {
		return time;
	}

	public String getStatus() {
		return status;
	}

	public String getDoctorFirstName() {
		return doctorFirstName;
	}

	public String getDoctorLastName() {
		return doctorLastName;
	}

	public String getDoctorEmail() {
		return doctorEmail;
	}

	public String getSpecialization() {
		return specialization;
	}
}