package com.hospital.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hospital.dto.request.PrescriptionRequest;
import com.hospital.dto.response.PrescriptionResponse;
import com.hospital.entity.Prescription;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.PrescriptionRepository;
import com.hospital.service.PrescriptionService;

@Service
public class PrescriptionServiceImpl implements PrescriptionService {

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	@Override
	public PrescriptionResponse createPrescription(PrescriptionRequest request) {
		Prescription prescription = new Prescription();
		prescription.setDate(LocalDate.now());
		prescription.setMedicines(request.getMedicines());
		prescription.setInstructions(request.getInstructions());
		prescription.setDoctorName(request.getDoctorName());
		prescription.setPatientName(request.getPatientName());
		prescription.setIssued(false);

		Prescription saved = prescriptionRepository.save(prescription);
		return new PrescriptionResponse(saved);
	}

	@Override
	public PrescriptionResponse getPrescriptionById(Long id) {
		Prescription prescription = prescriptionRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Prescription not found with ID: " + id));
		return new PrescriptionResponse(prescription);
	}

	@Override
	public List<PrescriptionResponse> getAllPrescriptions() {
		return prescriptionRepository.findAll().stream().map(PrescriptionResponse::new).collect(Collectors.toList());
	}

	@Transactional
	@Override
	public List<PrescriptionResponse> getPrescriptionsByPatient(String email) {
		List<Prescription> prescriptions = prescriptionRepository.findByPatientEmail(email);
		return prescriptions.stream().map(PrescriptionResponse::new).collect(Collectors.toList());
	}

	@Override
	public boolean deletePrescription(Long id) {
		if (!prescriptionRepository.existsById(id)) {
			return false;
		}
		prescriptionRepository.deleteById(id);
		return true;
	}
}