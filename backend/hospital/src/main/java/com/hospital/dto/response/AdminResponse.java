package com.hospital.dto.response;

import lombok.Data;

@Data
public class AdminResponse {

	private int adminId;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;

}
