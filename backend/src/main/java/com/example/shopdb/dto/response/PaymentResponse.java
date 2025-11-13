package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse extends RepresentationModel<PaymentResponse> {
    private Long id;
    private Long orderId;
    private Double amount;
    private String provider;
    private String status;
    private String transactionCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
