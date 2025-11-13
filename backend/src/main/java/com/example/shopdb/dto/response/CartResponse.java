package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponse extends RepresentationModel<CartResponse> {
    private Long id;
    private Long userId;
    private List<Long> itemIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
