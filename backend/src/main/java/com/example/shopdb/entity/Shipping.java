package com.example.shopdb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "shippings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipping extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String shippingAddress;
    private String shippingProvider;
    private String trackingNumber;
    private Double shippingFee;

    @Enumerated(EnumType.STRING)
    private ShippingStatus status = ShippingStatus.PENDING;

    private LocalDate estimatedDelivery;
    private LocalDateTime deliveredAt;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
