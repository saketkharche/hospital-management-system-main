package com.hospital.service;

import com.hospital.entity.User;

public interface UserService {

	public User createUser(String email, String password, String role);

}
