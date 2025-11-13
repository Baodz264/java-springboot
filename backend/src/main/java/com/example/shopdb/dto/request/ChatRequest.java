package com.example.shopdb.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequest {
    @NotNull
    private Long senderId;

    @NotNull
    private Long receiverId;

    private String message;

    private String imageUrl;

    private Boolean isRead;
}