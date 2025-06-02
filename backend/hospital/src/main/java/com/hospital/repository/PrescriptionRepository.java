package com.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hospital.entity.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

	@Query("SELECT p FROM Prescription p WHERE p.patientEmail = :email")
	List<Prescription> findByPatientEmail(@Param("email") String email);
}