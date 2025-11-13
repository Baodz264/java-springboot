package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse extends RepresentationModel<ReviewResponse> {
    private Long id;
    private Long productId;
    private Long userId;
    private Integer rating;
    private String comment;
    private String imageUrl;
    private Integer likes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
