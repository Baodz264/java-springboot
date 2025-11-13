package com.example.shopdb.dto.request;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequest {
    private Long productId;
    private Long userId;
    private Integer rating;
    private String comment;
    private String imageUrl;
    private Integer likes;
}

