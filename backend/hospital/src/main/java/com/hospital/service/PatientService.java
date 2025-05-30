package com.hospital.service;

import java.util.List;

import com.hospital.dto.request.PatientRegistrationRequest;
import com.hospital.dto.response.PatientResponse;

public interface PatientService {

	PatientResponse getPatientByEmail(String email);

	public PatientResponse registerPatient(PatientRegistrationRequest request);

	public PatientResponse updatePatient(String email, PatientResponse response);

	public boolean deletePatient(String email);

	List<PatientResponse> getAllPatients();

}
