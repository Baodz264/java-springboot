package com.example.shopdb.dto.response;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse extends RepresentationModel<OrderResponse> {
    private Long id;
    private Double totalPrice;
    private String status;
    private String paymentMethod;
    private String shippingAddress;
    private String voucherCode;
    private Long userId;
    private List<Long> itemIds;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
