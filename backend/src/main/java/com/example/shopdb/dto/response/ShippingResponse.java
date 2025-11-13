package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingResponse extends RepresentationModel<ShippingResponse> {
    private Long id;
    private Long orderId;
    private String shippingAddress;
    private String shippingProvider;
    private String trackingNumber;
    private Double shippingFee;
    private String status;
    private LocalDate estimatedDelivery;
    private LocalDateTime deliveredAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
