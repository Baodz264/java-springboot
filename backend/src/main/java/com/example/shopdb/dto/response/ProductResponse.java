package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse extends RepresentationModel<ProductResponse> {
    private Long id;
    private String sku;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String thumbnailUrl;
    private Boolean status;
    private Long categoryId;
    private Long brandId;
    private List<Long> imageIds;
    private List<Long> variantIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
