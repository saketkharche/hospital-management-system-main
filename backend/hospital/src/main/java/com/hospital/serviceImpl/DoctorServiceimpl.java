package com.hospital.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.dto.request.DoctorRequest;
import com.hospital.dto.response.DoctorResponse;
import com.hospital.entity.Doctor;
import com.hospital.entity.User;
import com.hospital.exception.CustomInternalServerException;
import com.hospital.exception.EmailAlreadyExistsException;
import com.hospital.repository.DoctorRepository;
import com.hospital.service.DoctorService;
import com.hospital.service.UserService;

@Service
public class DoctorServiceimpl implements DoctorService {

	@Autowired
	private UserService userService;

	@Autowired
	private DoctorRepository doctorRepository;

	public DoctorResponse registerDoctor(DoctorRequest request) {

		if (request == null) {
			throw new IllegalArgumentException("Registration request cannot be null");
		}

		try {
			// Step 1: Create User (Authentication Details)
			User savedUser = userService.createUser(request.getEmail(), request.getPassword(), "DOCTOR");

			Doctor doctor = new Doctor();
			BeanUtils.copyProperties(request, doctor);

			doctor.setUserId(savedUser.getId()); // Link with userId
			doctor = doctorRepository.save(doctor);
			return convertToResponse(doctor);

		} catch (EmailAlreadyExistsException ex) {
			// Handle custom exception for email already registered
			throw new EmailAlreadyExistsException(
					"The provided email is already registered. Please use a different email.");

		} catch (Exception ex) {
			throw new CustomInternalServerException(
					"An error occurred while registering the doctor. Please try again later.");
		}
	}

	public DoctorResponse fetchDoctorByEmail(String email) {
		Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));
		return convertToResponse(doctor);
	}

	public List<DoctorResponse> fetchAllDoctors() {
		return doctorRepository.findAll().stream().map(this::convertToResponse).collect(Collectors.toList());
	}

//	public DoctorResponse updateDoctor(String email, DoctorRequest request) {
//		Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));
//
//		// Update fields
//		doctor.setFirstName(request.getFirstName());
//		doctor.setLastName(request.getLastName());
//		doctor.setPhoneNumber(request.getPhoneNumber());
//		doctor.setCity(request.getCity());
//		doctor.setState(request.getState());
//		doctor.setCountry(request.getCountry());
//		doctor.setSpecialization(request.getSpecialization());
//		doctor.setBloodGroup(request.getBloodGroup());
//
//		doctor = doctorRepository.save(doctor);
//		return convertToResponse(doctor);
//	}

	public boolean deleteDoctor(String email) {
		Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));
		if (doctor != null) {
			doctorRepository.delete(doctor);
			return true;
		}
		return false;
	}

	private DoctorResponse convertToResponse(Doctor doctor) {
		DoctorResponse response = new DoctorResponse();
		response.setId(doctor.getId());
		response.setFirstName(doctor.getFirstName());
		response.setLastName(doctor.getLastName());
		response.setEmail(doctor.getEmail());
		response.setPhoneNumber(doctor.getPhoneNumber());
		response.setGender(doctor.getGender());
		response.setDateOfBirth(doctor.getDateOfBirth());
		response.setCity(doctor.getCity());
		response.setState(doctor.getState());
		response.setCountry(doctor.getCountry());
		response.setJoiningDate(doctor.getJoiningDate());
		response.setSpecialization(doctor.getSpecialization());
		response.setBloodGroup(doctor.getBloodGroup());
		return response;
	}

	@Override
	public DoctorResponse updateDoctor(String email, DoctorResponse request) {
		Doctor doctor = doctorRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Doctor not found"));

		// Update fields
		doctor.setFirstName(request.getFirstName());
		doctor.setLastName(request.getLastName());
		doctor.setPhoneNumber(request.getPhoneNumber());
		doctor.setCity(request.getCity());
		doctor.setState(request.getState());
		doctor.setCountry(request.getCountry());
		doctor.setSpecialization(request.getSpecialization());
		doctor.setBloodGroup(request.getBloodGroup());

		doctor = doctorRepository.save(doctor);
		return convertToResponse(doctor);
	}
}
