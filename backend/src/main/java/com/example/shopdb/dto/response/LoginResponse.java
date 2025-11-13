package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse extends RepresentationModel<LoginResponse> {
    private Long id;
    private String email;
    private String phone;
    private String fullName;
    private String token;
    private String role;
    private String avatarUrl; // ảnh đại diện
    private String message; // thông báo OTP
    private Long tempUserId;
}
