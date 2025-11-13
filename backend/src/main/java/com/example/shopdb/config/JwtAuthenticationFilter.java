package com.example.shopdb.config;

import com.example.shopdb.entity.User;
import com.example.shopdb.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // 1️⃣ Bỏ qua OPTIONS request (preflight)
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getServletPath();

        // 2️⃣ Bỏ qua các public endpoints
        if (path.startsWith("/api/auth/") ||
            path.startsWith("/api/mail/") ||
            path.startsWith("/uploads/") ||
            path.startsWith("/api/banners/") ||
            path.startsWith("/api/brands/") ||
            path.startsWith("/api/categories/") ||
            path.startsWith("/api/products/") ||
            path.startsWith("/api/product-images/") ||
            path.startsWith("/api/product-variants/") ||
            path.startsWith("/api/vouchers/") ||
            path.startsWith("/api/reviews/")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 3️⃣ Lấy JWT từ header
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);
        final String email = jwtService.extractUsername(jwt);

        // 4️⃣ Kiểm tra và set authentication
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null && jwtService.isTokenValid(jwt, email)) {
                String role = jwtService.extractRole(jwt);
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(authority));
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // 5️⃣ Chuyển tiếp filter chain
        filterChain.doFilter(request, response);
    }
}
