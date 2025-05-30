package com.hospital.security;


import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {
     
    private final JwtTokenUtil jwtUtil;

    public SecurityUtil(JwtTokenUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public String extractEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractUsername(token);
    }

    public List<String> extractRolesFromToken(String token) {
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.extractRoles(token);
    }

    public boolean isAdmin(Authentication authentication) {
        return authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }
}

