package com.hospital.dto.request;

import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

public class PrescriptionRequest {

    @NotBlank(message = "Patient name is required")
    private String patientName;

    @NotBlank(message = "Doctor name is required")
    private String doctorName;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private boolean issued;

    private String instructions;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Patient email is required")
    private String patientEmail;

    @NotEmpty(message = "Medicines list cannot be empty")
    private List<@NotBlank(message = "Medicine name cannot be blank") String> medicines;

    // Getters and setters

    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }
    public String getDoctorName() {
        return doctorName;
    }
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public boolean getIssued() {
        return issued;
    }
    public void setIssued(boolean issued) {
        this.issued = issued;
    }
    public String getInstructions() {
        return instructions;
    }
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    public String getPatientEmail() {
        return patientEmail;
    }
    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }
    public List<String> getMedicines() {
        return medicines;
    }
    public void setMedicines(List<String> medicines) {
        this.medicines = medicines;
    }
}
