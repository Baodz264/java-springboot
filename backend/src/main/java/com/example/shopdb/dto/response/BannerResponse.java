package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BannerResponse extends RepresentationModel<BannerResponse> {
    private Long id;
    private String title;
    private String imageUrl;
    private String link;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
