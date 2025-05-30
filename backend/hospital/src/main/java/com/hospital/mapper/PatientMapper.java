
package com.hospital.mapper;

import com.hospital.dto.response.PatientResponse;
import com.hospital.entity.Patient;

// File: com.example.hospitalmanagement.mapper.PatientMapper.java



public class PatientMapper {

    // Converts Patient entity to PatientResponse DTO
    public static PatientResponse toPatientResponse(Patient patient) {
        if (patient == null) {
            return null;
        }

        PatientResponse response = new PatientResponse();
        response.setPatientId(patient.getPatientId());
        response.setFirstName(patient.getFirstName());
        response.setLastName(patient.getLastName());
        response.setEmail(patient.getEmail());
        response.setPhoneNumber(patient.getPhoneNumber());
        response.setGender(patient.getGender());
        response.setDateOfBirth(patient.getDateOfBirth());
        response.setCity(patient.getCity());
        response.setState(patient.getState());
        response.setCountry(patient.getCountry());

        return response;
    }
}

