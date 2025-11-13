package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandRequest {
    @NotBlank
    private String name;
    private String description;
    private String logoUrl;
    private Boolean status;
}
