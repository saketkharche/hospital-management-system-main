package com.hospital.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hospital.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	    com.hospital.entity.User user = userRepository.findByEmail(email.toLowerCase())
	            .orElseThrow(() -> {
	                logger.error("User not found with email: {}", email);
	                return new UsernameNotFoundException("User not found");
	            });

	    UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(user.getEmail());
	    builder.password(user.getPassword());

	    // Add ROLE_ prefix to roles for authorities
	    String prefixedRole = "ROLE_" + user.getRole().toString().toUpperCase();
	    builder.authorities(prefixedRole);

	    logger.debug("User details successfully built for authentication with role: {}", prefixedRole);
	    return builder.build();
	}


}
