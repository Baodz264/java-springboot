package com.example.shopdb.service;

import com.example.shopdb.dto.response.ChatResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ChatService {
    ChatResponse sendMessage(Long senderId, Long receiverId, String message, MultipartFile image) throws Exception;
    List<ChatResponse> getChatBetweenUsers(Long user1Id, Long user2Id);
    void markAsRead(Long chatId);

    // Search chat có phân trang
    Page<ChatResponse> search(Long senderId, Long receiverId, String keyword, Boolean isRead, Pageable pageable);
}
