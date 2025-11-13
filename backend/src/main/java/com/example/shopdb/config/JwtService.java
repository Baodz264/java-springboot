package com.example.shopdb.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    // ❗ Chuỗi secret key phải >= 32 ký tự
    private static final String SECRET_KEY = "your_secret_key_here_minimum_32_characters_long";

    // Lấy key để ký token
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ========================
    // ✅ GENERATE TOKEN
    // ========================
    // Sinh token chứa userId, email và role
    public String generateToken(Long userId, String email, String role) {
        return Jwts.builder()
                .claim("userId", userId)  // lưu id user
                .claim("role", role)      // lưu role
                .setSubject(email)        // email làm subject
                .setIssuedAt(new Date())  // thời gian tạo
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 ngày
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // ký token
                .compact();
    }

    // ========================
    // ✅ EXTRACT CLAIMS
    // ========================
    // Trích xuất email/username từ token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Trích xuất userId từ token
    public Long extractUserId(String token) {
        return extractClaim(token, claims -> claims.get("userId", Long.class));
    }

    // Trích xuất role từ token
    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }

    // Trích xuất các claim tùy ý
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Lấy toàn bộ claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ========================
    // ✅ TOKEN VALIDATION
    // ========================
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // Kiểm tra token hợp lệ so với email
    public boolean isTokenValid(String token, String email) {
        String username = extractUsername(token);
        return username.equals(email) && !isTokenExpired(token);
    }
}
