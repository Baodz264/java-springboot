package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantResponse extends RepresentationModel<ProductVariantResponse> {
    private Long id;
    private String size;
    private String color;
    private Double extraPrice;
    private Integer stock;
    private String imageUrl;
    private Long productId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
