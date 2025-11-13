package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingRequest {
    @NotNull
    private Long orderId;
    private String shippingAddress;
    private String shippingProvider;
    private String trackingNumber;
    private Double shippingFee;
    private String status; // PENDING, SHIPPING, ...
    private LocalDate estimatedDelivery;
    private LocalDateTime deliveredAt;
}
