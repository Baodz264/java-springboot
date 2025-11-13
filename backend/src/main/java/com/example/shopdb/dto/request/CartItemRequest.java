package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemRequest {
    @NotNull
    private Long cartId;
    @NotNull
    private Long productVariantId;
    private Integer quantity;
}
