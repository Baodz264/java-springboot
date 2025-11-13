package com.example.shopdb.repository;

import com.example.shopdb.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    // Search theo code hoặc discountType (enum cast sang string)
    @Query("SELECT v FROM Voucher v " +
           "WHERE LOWER(v.code) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "   OR LOWER(CAST(v.discountType AS string)) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Voucher> searchByCodeOrDiscountType(@Param("keyword") String keyword);

    // Search theo trạng thái
    List<Voucher> findByStatus(Boolean status);
}
