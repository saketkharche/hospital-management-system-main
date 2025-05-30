package com.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hospital.entity.Doctor;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	Optional<Doctor> findByEmail(String email);
	
	
}
