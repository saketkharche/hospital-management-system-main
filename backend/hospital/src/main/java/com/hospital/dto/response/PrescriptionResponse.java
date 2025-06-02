package com.hospital.dto.response;

import java.time.LocalDate;
import java.util.List;

import com.hospital.entity.Prescription;

public class PrescriptionResponse {
	private Long id;
	private String patientName;
	private String doctorName;
	private List<String> medicines;
	private String instructions;
	private LocalDate date;
	private Boolean issued;

	public PrescriptionResponse(Prescription prescription) {
		this.id = prescription.getId();
		this.patientName = prescription.getPatientName();
		this.doctorName = prescription.getDoctorName();
		this.medicines = prescription.getMedicines();
		this.instructions = prescription.getInstructions();
		this.date = prescription.getDate();
		this.issued = prescription.isIssued();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public List<String> getMedicines() {
		return medicines;
	}

	public void setMedicines(List<String> medicines) {
		this.medicines = medicines;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Boolean getIssued() {
		return issued;
	}

	public void setIssued(Boolean issued) {
		this.issued = issued;
	}

	// Getters and Setters
}