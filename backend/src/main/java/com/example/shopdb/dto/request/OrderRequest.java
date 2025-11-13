package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {
    @NotNull
    private Long userId;
    private Double totalPrice;
    private String shippingAddress;
    private String voucherCode;
    private String paymentMethod; // COD, BANK, VNPAY...
    private String status; // PENDING, PAID, ...
    private List<OrderItemRequest> items;
}
