package com.hospital.serviceImpl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.dto.response.AdminResponse;
import com.hospital.entity.Admin;
import com.hospital.repository.AdminRepository;
import com.hospital.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepository;

	@Override
	public AdminResponse getAdminData(String email) {
		Admin admin = this.adminRepository.findByEmail(email);
		AdminResponse adminResponse = new AdminResponse();
		BeanUtils.copyProperties(admin, adminResponse);
		return adminResponse != null ? adminResponse : null;
	}

}
