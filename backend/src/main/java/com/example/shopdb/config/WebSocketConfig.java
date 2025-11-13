package com.example.shopdb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint WebSocket (phải trùng với frontend gọi)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // cho phép mọi nguồn (CORS)
                .withSockJS(); // bật SockJS
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Prefix cho các message từ client gửi tới server
        registry.setApplicationDestinationPrefixes("/app");

        // Prefix cho server gửi tin nhắn tới client
        registry.enableSimpleBroker("/topic", "/queue");
        registry.setUserDestinationPrefix("/user");        // cho convertAndSendToUser
    }
}
