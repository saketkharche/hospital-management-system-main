package com.hospital.dto.request;

//File: com.example.hospitalmanagement.dto.PatientRegistrationRequest.java

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PatientRegistrationRequest {

	@NotBlank(message = "First name is required")
	@Size(min = 2, max = 50, message = "First name should be between 2 to 50 characters")
	private String firstName;

	@NotBlank(message = "Last name is required")
	@Size(min = 2, max = 50, message = "Last name should be between 2 to 50 characters")
	private String lastName;

	@Email(message = "Email should be valid")
	@NotBlank(message = "Email is required")
	private String email;

	@NotBlank(message = "Phone number is required")
	@jakarta.validation.constraints.Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
	private String phoneNumber;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotBlank(message = "Date of birth is required")
	private String dateOfBirth; // Use LocalDate if you want a Date picker in your front-end

	private String address;

	private String city;

	private String state;

	private String country;

	@NotBlank(message = "Password is required")
	@Size(min = 6, message = "Password should be at least 6 characters long")
	private String password;
}
