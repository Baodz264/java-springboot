package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImageResponse extends RepresentationModel<ProductImageResponse> {
    private Long id;
    private String imageUrl;
    private Long productId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
