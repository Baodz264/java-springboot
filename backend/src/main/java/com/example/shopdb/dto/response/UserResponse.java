package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse extends RepresentationModel<UserResponse> {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String avatarUrl;
    private String role;
    private Boolean status;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String gender;
    private LocalDate dateOfBirth;
}
