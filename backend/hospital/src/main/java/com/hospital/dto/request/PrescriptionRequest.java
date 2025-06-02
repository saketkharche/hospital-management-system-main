package com.hospital.dto.request;

import java.util.List;

public class PrescriptionRequest {
	private String patientName;
	private String doctorName;
	private List<String> medicines;
	private String instructions;

	public PrescriptionRequest(String patientName, String doctorName, List<String> medicines, String instructions) {
		super();
		this.patientName = patientName;
		this.doctorName = doctorName;
		this.medicines = medicines;
		this.instructions = instructions;
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

	// Constructors, getters, setters
}