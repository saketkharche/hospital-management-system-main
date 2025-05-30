package com.hospital.service;

import java.util.List;

import com.hospital.dto.request.DoctorRequest;
import com.hospital.dto.response.DoctorResponse;

public interface DoctorService {

	public DoctorResponse registerDoctor(DoctorRequest request);

	public DoctorResponse fetchDoctorByEmail(String email);

	public List<DoctorResponse> fetchAllDoctors();

	public DoctorResponse updateDoctor(String eamil, DoctorResponse request);

	public boolean deleteDoctor(String email);

}
