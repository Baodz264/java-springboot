package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoucherRequest {
    @NotBlank
     private Long id;
    private String code;
    private String discountType; // PERCENT, FIXED
    private Double discountValue;
    private Double minOrderValue;
    private Integer usageLimit;
    private Integer usedCount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String imageUrl;
    private Boolean status;
}
