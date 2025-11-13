package com.example.shopdb.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductRequest {
    @NotBlank
    private String sku;
    @NotBlank
    private String name;
    private String description;
    @NotNull
    private Double price;
    private Integer stock;
    private String thumbnailUrl;
    private Boolean status;
    private Long categoryId;
    private Long brandId;
}
