package com.hospital.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MedicineItemRequest {

	@NotBlank(message = "Medicine name is required")
	private String name;

	@NotBlank(message = "Dosage is required")
	private String dosage;

	@NotBlank(message = "Frequency is required")
	private String frequency;

	@NotBlank(message = "Duration is required")
	private String duration;

	private String instructions;
}