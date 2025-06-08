package com.hospital.serviceImpl;

import com.hospital.dto.request.PrescriptionRequest;
import com.hospital.dto.response.PrescriptionResponse;
import com.hospital.entity.Prescription;
import com.hospital.repository.PrescriptionRepository;
import com.hospital.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;  // important

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Override
    public PrescriptionResponse issuePrescription(PrescriptionRequest request) {
        Prescription prescription = new Prescription();
        prescription.setPatientName(request.getPatientName());
        prescription.setDoctorName(request.getDoctorName());
        prescription.setDate(request.getDate());
        prescription.setIssued(request.getIssued());
        prescription.setInstructions(request.getInstructions());
        prescription.setPatientEmail(request.getPatientEmail());
        prescription.setMedicines(request.getMedicines());

        Prescription saved = prescriptionRepository.save(prescription);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)  // keep session open for lazy loading during serialization
    public List<PrescriptionResponse> getPrescriptionsByPatient(String email) {
        List<Prescription> prescriptions = prescriptionRepository.findByPatientEmail(email);

        return prescriptions.stream()
                .map(p -> new PrescriptionResponse(
                        p.getId(),
                        p.getDate(),
                        p.getDoctorName(),
                        p.getInstructions(),
                        p.isIssued(),
                        p.getPatientName(),
                        p.getPatientEmail(),
                        p.getMedicines()
                ))
                .collect(Collectors.toList());
    }

    private PrescriptionResponse mapToResponse(Prescription prescription) {
        PrescriptionResponse response = new PrescriptionResponse();
        response.setId(prescription.getId());
        response.setPatientName(prescription.getPatientName());
        response.setDoctorName(prescription.getDoctorName());
        response.setDate(prescription.getDate());
        response.setIssued(prescription.isIssued());
        response.setInstructions(prescription.getInstructions());
        response.setPatientEmail(prescription.getPatientEmail());
        response.setMedicines(prescription.getMedicines());
        return response;
    }
}
