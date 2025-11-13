package com.example.shopdb.service.impl;

import com.example.shopdb.dto.response.ChatResponse;
import com.example.shopdb.entity.Chat;
import com.example.shopdb.entity.User;
import com.example.shopdb.repository.ChatRepository;
import com.example.shopdb.repository.UserRepository;
import com.example.shopdb.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/chats/";

    @Override
    public ChatResponse sendMessage(Long senderId, Long receiverId, String message, MultipartFile image) throws Exception {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        String imageUrl = saveImage(image);

        Chat chat = Chat.builder()
                .sender(sender)
                .receiver(receiver)
                .message(message)
                .imageUrl(imageUrl)
                .isRead(false)
                .build();

        return toResponse(chatRepository.save(chat));
    }

    @Override
    public List<ChatResponse> getChatBetweenUsers(Long user1Id, Long user2Id) {
        List<Chat> list1 = chatRepository.findBySenderIdAndReceiverIdOrderByCreatedAtAsc(user1Id, user2Id);
        List<Chat> list2 = chatRepository.findBySenderIdAndReceiverIdOrderByCreatedAtAsc(user2Id, user1Id);

        List<Chat> allChats = new ArrayList<>();
        allChats.addAll(list1);
        allChats.addAll(list2);
        allChats.sort(Comparator.comparing(Chat::getCreatedAt));

        return allChats.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Long chatId) {
        chatRepository.findById(chatId).ifPresent(chat -> {
            chat.setIsRead(true);
            chatRepository.save(chat);
        });
    }

    @Override
    public Page<ChatResponse> search(Long senderId, Long receiverId, String keyword, Boolean isRead, Pageable pageable) {
        Specification<Chat> spec = Specification.where(null);

        if (senderId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("sender").get("id"), senderId));
        }
        if (receiverId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("receiver").get("id"), receiverId));
        }
        if (keyword != null && !keyword.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("message")), "%" + keyword.toLowerCase() + "%"));
        }
        if (isRead != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("isRead"), isRead));
        }

        return chatRepository.findAll(spec, pageable)
                .map(this::toResponse);
    }

    // --- Helper methods ---
    private String saveImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return null;

        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR, fileName);
            Files.write(path, file.getBytes(), StandardOpenOption.CREATE);
            return "/uploads/chats/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Error saving image: " + e.getMessage());
        }
    }

    private ChatResponse toResponse(Chat chat) {
        return ChatResponse.builder()
                .id(chat.getId())
                .senderId(chat.getSender() != null ? chat.getSender().getId() : null)
                .receiverId(chat.getReceiver() != null ? chat.getReceiver().getId() : null)
                .message(chat.getMessage())
                .imageUrl(chat.getImageUrl())
                .isRead(chat.getIsRead())
                .createdAt(chat.getCreatedAt())
                .updatedAt(chat.getUpdatedAt())
                .build();
    }
}
