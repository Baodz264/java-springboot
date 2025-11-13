// src/contexts/WebSocketProvider.jsx
import React, { createContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children, userId }) => {
  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS("http://localhost:8080/ws"); // URL server
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP:", str),
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);

        // Subscribe chat riêng cho user
        stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
          const data = JSON.parse(msg.body);
          window.dispatchEvent(new CustomEvent("newMessage", { detail: data }));
        });

        // Subscribe tất cả các topic khác
        stompClient.subscribe("/topic/reviews", (msg) => {
          const data = JSON.parse(msg.body);
          window.dispatchEvent(new CustomEvent("newReview", { detail: data }));
        });

        stompClient.subscribe("/topic/comments", (msg) => {
          const data = JSON.parse(msg.body);
          window.dispatchEvent(new CustomEvent("newComment", { detail: data }));
        });

        // Thêm các topic khác nếu cần
      },
      onDisconnect: () => setConnected(false),
      onStompError: (frame) =>
        console.error("STOMP error:", frame.headers["message"]),
    });

    stompClient.activate();
    setClient(stompClient);

    return () => stompClient.deactivate();
  }, [userId]);

  return (
    <WebSocketContext.Provider value={{ client, connected }}>
      {children}
    </WebSocketContext.Provider>
  );
};
