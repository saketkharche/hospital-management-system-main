package com.hospital.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "doctors")
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank(message = "First name is required")
	private String firstName;

	@NotBlank(message = "Last name is required")
	private String lastName;

	@Column(name = "user_id", nullable = false)
	private Long userId;

	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Column(unique = true)
	private String email;

	@NotBlank(message = "Phone number is required")
	@Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
	private String phoneNumber;

	@NotBlank(message = "Gender is required")
	private String gender;

	@NotNull(message = "Date of birth is required")
	private LocalDate dateOfBirth;

	@NotBlank(message = "City is required")
	private String city;

	@NotBlank(message = "State is required")
	private String state;

	@NotBlank(message = "Country is required")
	private String country;

	@NotBlank(message = "Password is required")
	@Size(min = 8, message = "Password must be at least 8 characters long")
	private String password;

	@NotNull(message = "Joining date is required")
	private LocalDate joiningDate;

	@NotBlank(message = "Specialization is required")
	private String specialization;

	@NotBlank(message = "Blood group is required")
	private String bloodGroup;
}
