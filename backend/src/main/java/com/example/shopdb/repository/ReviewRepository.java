package com.example.shopdb.repository;

import com.example.shopdb.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCommentContainingIgnoreCase(String keyword);
    List<Review> findByProduct_Id(Long productId);
    List<Review> findByUser_Id(Long userId);
    List<Review> findByRatingBetween(Integer min, Integer max);
}
