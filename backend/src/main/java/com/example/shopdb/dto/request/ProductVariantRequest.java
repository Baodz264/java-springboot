package com.example.shopdb.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductVariantRequest {
    private String size;
    private String color;
    private Double extraPrice;
    private Integer stock;
    private String imageUrl;
    @NotNull
    private Long productId;
}
