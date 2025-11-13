package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressRequest {
    @NotBlank
    private String fullName;
    private String phone;
    @NotBlank
    private String addressLine;
    private String city;
    private String district;
    private String ward;
    private Boolean isDefault;
    private Long userId;
}
