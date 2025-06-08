package com.hospital.dto.response;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String role;
    private String doctorName;  // e.g. "Dr. John Doe"
}
