package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse extends RepresentationModel<CategoryResponse> {
    private Long id;
    private String name;
    private String imageUrl;
    private Long parentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
