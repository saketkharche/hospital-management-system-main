package com.hospital.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private LocalDate date;

	@ElementCollection(fetch = FetchType.EAGER) // ✅ Force Hibernate to load `medicines`
	private List<String> medicines;

	private String instructions;

	private String doctorName;

	private String patientName;

	@Column(name = "patient_email", nullable = false) // ✅ Explicit column mapping
	private String patientEmail;

	private boolean issued;

	// Setter method to allow updates
	public void setPatientEmail(String patientEmail) {
		this.patientEmail = patientEmail;
	}
}