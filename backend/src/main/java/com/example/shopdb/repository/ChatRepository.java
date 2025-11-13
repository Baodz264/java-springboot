package com.example.shopdb.repository;

import com.example.shopdb.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long>, JpaSpecificationExecutor<Chat> {
    // Lấy tất cả chat giữa sender và receiver
    List<Chat> findBySenderIdAndReceiverIdOrderByCreatedAtAsc(Long senderId, Long receiverId);
}
