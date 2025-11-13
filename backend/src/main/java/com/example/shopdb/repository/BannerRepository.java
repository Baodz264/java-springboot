package com.example.shopdb.repository;

import com.example.shopdb.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    // search theo tiêu đề (không phân biệt hoa thường)
    List<Banner> findByTitleContainingIgnoreCase(String keyword);
}
