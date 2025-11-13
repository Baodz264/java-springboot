package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequest {
    @NotNull
    private Long orderId;
    @NotNull
    private Double amount;
    private String provider; // COD, BANK, VNPAY...
    private String status; // PENDING, SUCCESS, FAILED
    private String transactionCode;
    
}
