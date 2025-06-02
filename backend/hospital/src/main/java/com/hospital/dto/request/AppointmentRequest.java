package com.hospital.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentRequest {
	private String patientName;
	private String patientEmail; // ✅ Added email field
	private String doctorName;
	private String date;
	private String time;
}