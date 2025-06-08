package com.hospital.dto.response;

import java.time.LocalDate;
import java.util.List;

public class PrescriptionResponse {

    private Long id;
    private LocalDate date;
    private String doctorName;
    private String instructions;
    private boolean issued;
    private String patientName;
    private String patientEmail;
    private List<String> medicines;

    // Constructors
    public PrescriptionResponse() {}

    public PrescriptionResponse(Long id, LocalDate date, String doctorName, String instructions,
                               boolean issued, String patientName, String patientEmail, List<String> medicines) {
        this.id = id;
        this.date = date;
        this.doctorName = doctorName;
        this.instructions = instructions;
        this.issued = issued;
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.medicines = medicines;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getDoctorName() {
        return doctorName;
    }
    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
    public String getInstructions() {
        return instructions;
    }
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    public boolean isIssued() {
        return issued;
    }
    public void setIssued(boolean issued) {
        this.issued = issued;
    }
    public String getPatientName() {
        return patientName;
    }
    public void setPatientName(String patientName) {
        this.patientName = patientName;
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
