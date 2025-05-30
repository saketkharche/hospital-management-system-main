package com.hospital.serviceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.dto.request.PatientRegistrationRequest;
import com.hospital.dto.response.PatientResponse;
import com.hospital.entity.Patient;
import com.hospital.entity.User;
import com.hospital.exception.CustomInternalServerException;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.mapper.PatientMapper;
import com.hospital.repository.PatientRepository;
import com.hospital.service.PatientService;
import com.hospital.service.UserService;

import jakarta.transaction.Transactional;

@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private UserService userService; // Injected UserService

	@Override
	public PatientResponse registerPatient(PatientRegistrationRequest request) {
		if (request == null) {
			throw new IllegalArgumentException("Registration request cannot be null");
		}

		try {
			// Step 1: Create User (Authentication Details)
			User savedUser = userService.createUser(request.getEmail(), request.getPassword(), "PATIENT");

			// Step 2: Save Patient (Profile Details)
			Patient patient = new Patient();
			BeanUtils.copyProperties(request, patient);
			patient.setUserId(savedUser.getId()); // Link with userId
			Patient savedPatient = patientRepository.save(patient);

			// Step 3: Return the Response using PatientMapper
			return PatientMapper.toPatientResponse(savedPatient);

		} catch (EmailAlreadyExistsException ex) {
			// Handle custom exception for email already registered
			throw new EmailAlreadyExistsException(
					"The provided email is already registered. Please use a different email.");

		} catch (Exception ex) {
			throw new CustomInternalServerException(
					"An error occurred while registering the patient. Please try again later.");
		}
	}

	public Optional<Patient> findByEmail(String email) {
		return patientRepository.findByEmail(email);
	}

	@Override
	public PatientResponse getPatientByEmail(String email) {
		Optional<Patient> patient = patientRepository.findByEmail(email);
		return patient.map(PatientMapper::toPatientResponse).orElse(null);
	}

	@Override
	public List<PatientResponse> getAllPatients() {
		List<Patient> patients = patientRepository.findAll();
		return patients.stream().map(PatientMapper::toPatientResponse).collect(Collectors.toList());
	}

	public PatientResponse updatePatient(String email, PatientResponse updatedPatient) {
		Optional<Patient> existingPatient = findByEmail(email);

		if (!existingPatient.isPresent()) {
			throw new IllegalArgumentException("Patient not found");
		}

		Patient patient = existingPatient.get();

		// Update the patient details with new values, checking for null values
		if (updatedPatient.getFirstName() != null) {
			patient.setFirstName(updatedPatient.getFirstName());
		}
		if (updatedPatient.getLastName() != null) {
			patient.setLastName(updatedPatient.getLastName());
		}
		if (updatedPatient.getPhoneNumber() != null) {
			patient.setPhoneNumber(updatedPatient.getPhoneNumber());
		}
		if (updatedPatient.getGender() != null) {
			patient.setGender(updatedPatient.getGender());
		}
		if (updatedPatient.getDateOfBirth() != null) {
			patient.setDateOfBirth(updatedPatient.getDateOfBirth());
		}
		if (updatedPatient.getCity() != null) {
			patient.setCity(updatedPatient.getCity());
		}
		if (updatedPatient.getState() != null) {
			patient.setState(updatedPatient.getState());
		}
		if (updatedPatient.getCountry() != null) {
			patient.setCountry(updatedPatient.getCountry());
		}

		// Save the updated patient details to the database (assuming you save it in
		// your repository)
		patientRepository.save(patient);

		// Return the updated PatientResponse using a mapper to convert the entity to a
		// DTO
		return PatientMapper.toPatientResponse(patient);
	}

	@Transactional
	public boolean deletePatient(String email) {
		// Check if the patient exists by email
		Optional<Patient> optionalPatient = patientRepository.findByEmail(email);

		if (optionalPatient.isEmpty()) {
			// Patient with the provided email does not exist
			return false; // Return false indicating patient not found
		}

		// Delete the patient from the repository
		Patient patientToDelete = optionalPatient.get();
		patientRepository.delete(patientToDelete);

		return true; // Return true indicating successful deletion
	}

}
