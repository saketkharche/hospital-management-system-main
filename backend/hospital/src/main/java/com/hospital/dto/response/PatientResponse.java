package com.hospital.dto.response;

// File: com.example.hospitalmanagement.dto.PatientResponse.java


import lombok.Data;

@Data
public class PatientResponse {
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
    private String dateOfBirth;
    private String city;
    private String state;
    private String country;
}

