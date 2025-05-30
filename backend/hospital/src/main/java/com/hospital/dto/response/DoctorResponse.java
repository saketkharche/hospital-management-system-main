package com.hospital.dto.response;


import lombok.Data;

import java.time.LocalDate;

@Data
public class DoctorResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String gender;
    private LocalDate dateOfBirth;
    private String city;
    private String state;
    private String country;
    private LocalDate joiningDate;
    private String specialization;
    private String bloodGroup;
}
