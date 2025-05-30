package com.hospital.repository;

//File: com.example.hospitalmanagement.repository.PatientRepository.java

import com.hospital.entity.Patient;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	
	Optional<Patient> findByEmail(String email);

	Optional<Patient> findByPhoneNumber(String phoneNumber);
}
