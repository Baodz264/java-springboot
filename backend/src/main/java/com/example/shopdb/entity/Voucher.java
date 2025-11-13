package com.example.shopdb.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "vouchers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Voucher extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    private Double discountValue;
    private Double minOrderValue;

    private Integer usageLimit = 0;
    private Integer usedCount = 0;

    private LocalDate startDate;
    private LocalDate endDate;

    // ảnh voucher
    private String imageUrl;

    private Boolean status = true;
}
