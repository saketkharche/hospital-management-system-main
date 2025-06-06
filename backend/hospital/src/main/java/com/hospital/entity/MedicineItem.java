package com.hospital.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medicine_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "Medicine name is required")
	@Column(nullable = false)
	private String name;

	@NotBlank(message = "Dosage is required")
	private String dosage;

	@NotBlank(message = "Frequency is required")
	private String frequency;

	@NotBlank(message = "Duration is required")
	private String duration;

	private String specialInstructions;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "prescription_id", nullable = false)
	private Prescription prescription;
}