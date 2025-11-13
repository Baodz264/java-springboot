package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemRequest {
    @NotNull
    private Long orderId;
    @NotNull
    private Long productVariantId;
    private Double price;
    private Integer quantity;
}
