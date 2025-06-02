package com.hospital.service;

import java.util.List;

import com.hospital.dto.request.PrescriptionRequest;
import com.hospital.dto.response.PrescriptionResponse;

public interface PrescriptionService {
	PrescriptionResponse createPrescription(PrescriptionRequest request);

	PrescriptionResponse getPrescriptionById(Long id);

	List<PrescriptionResponse> getAllPrescriptions();

	List<PrescriptionResponse> getPrescriptionsByPatient(String email);

	boolean deletePrescription(Long id);
}