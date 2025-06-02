package com.hospital.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.hospital.security.JwtAuthenticationFilter;
import com.hospital.security.UserDetailsServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	// ✅ Security filter chain
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // 🔓 Allow
																											// preflight
																											// requests
						.requestMatchers("/", "/hospital/**", "/home", "/api/login", "/api/patients/register",
								"/api/appointments", "/api/feedback", "/api/doctors/fetchAllDoctorNames")
						.permitAll().requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
						.requestMatchers("/api/doctor/**").hasAnyAuthority("ROLE_DOCTOR", "ROLE_ADMIN")
						.requestMatchers("/api/nurse/**").hasAuthority("ROLE_NURSE").requestMatchers("/api/staff/**")
						.hasAuthority("ROLE_STAFF").requestMatchers("/api/patients/**")
						.hasAnyAuthority("ROLE_PATIENT", "ROLE_ADMIN").anyRequest().authenticated())
				.exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, authException) -> {
					response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
					response.setContentType("application/json");
					response.getWriter().write("{\"error\": \"" + authException.getMessage() + "\"}");
				})).sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	// ✅ CORS configuration for Spring Security
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:3000")); // Frontend origin
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*")); // Allow all headers
		config.setExposedHeaders(List.of("Authorization", "Content-Type"));
		config.setAllowCredentials(true); // Allow cookies/JWTs

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}

	// ✅ Global CorsFilter to ensure CORS runs before Spring Security
	@Bean
	@Order(Ordered.HIGHEST_PRECEDENCE)
	public CorsFilter customCorsFilter() {
		return new CorsFilter(corsConfigurationSource());
	}

	// ✅ Auth provider using UserDetailsService + password encoder
	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(userDetailsService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	// ✅ Password encoder
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// ✅ Authentication manager
	@Bean
	public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class).userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder()).and().build();
	}
}