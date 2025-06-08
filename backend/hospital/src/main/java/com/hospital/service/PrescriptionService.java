package com.hospital.service;

import com.hospital.dto.request.PrescriptionRequest;
import com.hospital.dto.response.PrescriptionResponse;

import java.util.List;

public interface PrescriptionService {
    PrescriptionResponse issuePrescription(PrescriptionRequest request);
    List<PrescriptionResponse> getPrescriptionsByPatient(String email);
}
