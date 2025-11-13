package com.example.shopdb.controller;

import com.example.shopdb.dto.request.ChatRequest;
import com.example.shopdb.dto.response.ChatResponse;
import com.example.shopdb.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    // ========== REST API ==========

    @PostMapping("/send")
    public ChatResponse sendMessage(@RequestParam Long senderId,
                                    @RequestParam Long receiverId,
                                    @RequestParam(required = false) String message,
                                    @RequestPart(value = "image", required = false) MultipartFile image) throws Exception {
        ChatResponse saved = chatService.sendMessage(senderId, receiverId, message, image);

        messagingTemplate.convertAndSendToUser(
                String.valueOf(receiverId),
                "/queue/messages",
                saved
        );
        messagingTemplate.convertAndSendToUser(
                String.valueOf(senderId),
                "/queue/messages",
                saved
        );

        return saved;
    }

    @GetMapping("/between")
    public List<ChatResponse> getChatBetweenUsers(@RequestParam Long user1Id,
                                                  @RequestParam Long user2Id) {
        return chatService.getChatBetweenUsers(user1Id, user2Id);
    }

    @PutMapping("/{chatId}/read")
    public void markAsRead(@PathVariable Long chatId) {
        chatService.markAsRead(chatId);
    }

    // Search chat
    @GetMapping("/search")
    public Page<ChatResponse> searchChats(
            @RequestParam(required = false) Long senderId,
            @RequestParam(required = false) Long receiverId,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean isRead,
            Pageable pageable
    ) {
        return chatService.search(senderId, receiverId, keyword, isRead, pageable);
    }

    // ========== WEBSOCKET ==========
    @MessageMapping("/chat.send")
    public void sendMessageWS(ChatRequest request) throws Exception {
        if ((request.getMessage() == null || request.getMessage().trim().isEmpty())
                && request.getImageUrl() == null) {
            return;
        }

        ChatResponse saved = chatService.sendMessage(
                request.getSenderId(),
                request.getReceiverId(),
                request.getMessage(),
                null
        );

        messagingTemplate.convertAndSendToUser(
                String.valueOf(request.getReceiverId()),
                "/queue/messages",
                saved
        );

        messagingTemplate.convertAndSendToUser(
                String.valueOf(request.getSenderId()),
                "/queue/messages",
                saved
        );
    }
}
