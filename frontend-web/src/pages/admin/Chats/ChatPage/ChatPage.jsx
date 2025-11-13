import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, ChatWrapper } from "./style";
import ChatUserList from "../ChatUserList/ChatUserList";
import ChatList from "../ChatList/ChatList";
import ChatForm from "../ChatForm/ChatForm";
import UserService from "../../../../services/userService";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import chatService from "../../../../services/chatService";

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  // ✅ Lấy thông tin admin đang đăng nhập
  const admin = JSON.parse(localStorage.getItem("admin_user") || "{}");
  const currentUserId = admin?.id || 0;

  const stompClient = useRef(null);

  // ====== INIT WEBSOCKET ======
  useEffect(() => {
    // 🔹 Lấy danh sách user (trừ chính admin)
    UserService.getAll()
      .then((data) => {
        const filtered = Array.isArray(data)
          ? data.filter((u) => u.id !== currentUserId)
          : [];
        setUsers(filtered);
      })
      .catch((err) => console.error("User fetch error:", err));

    // 🔹 Kết nối WebSocket
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        // Nhận tin nhắn gửi tới admin
        stompClient.current.subscribe(
          `/user/${currentUserId}/queue/messages`,
          (msg) => {
            const chat = JSON.parse(msg.body);
            setMessages((prev) => {
              const exists = prev.some((m) => m.id === chat.id);
              if (exists) return prev;
              return [
                ...prev,
                { ...chat, _key: `${chat.id || Date.now()}-${prev.length}` },
              ];
            });
          }
        );
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current?.deactivate();
    };
  }, [currentUserId]);

  // ====== FETCH LỊCH SỬ CHAT ======
  const fetchMessages = useCallback(
    async (userId) => {
      try {
        const chats = await chatService.getChatBetweenUsers(
          currentUserId,
          userId
        );
        setMessages(
          Array.isArray(chats)
            ? chats.map((chat, index) => ({
                ...chat,
                _key: `${chat.id || Date.now()}-${index}`,
              }))
            : []
        );
      } catch (err) {
        console.error("Fetch messages error:", err);
        setMessages([]);
      }
    },
    [currentUserId] // dependency cần thiết
  );

  // Gọi fetchMessages khi chọn user
  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.id);
  }, [selectedUser, fetchMessages]);

  // ====== GỬI TIN NHẮN ======
  const handleSend = async (text, imageFile) => {
    if (!selectedUser || !stompClient.current?.connected) return;

    try {
      const chatPayload = await chatService.sendMessage({
        senderId: currentUserId,
        receiverId: selectedUser.id,
        message: text,
        imageFile,
      });

      // Hiển thị ngay khi gửi
      setMessages((prev) => [
        ...prev,
        { ...chatPayload, _key: `${Date.now()}-${prev.length}` },
      ]);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  return (
    <Container>
      <ChatUserList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
        messages={messages}
        currentUserId={currentUserId}
      />

      <ChatWrapper>
        {selectedUser ? (
          <>
            <ChatList
              messages={messages}
              currentUserId={currentUserId}
              users={users}
            />
            <ChatForm
              onSend={handleSend}
              disabled={!stompClient.current?.connected}
            />
          </>
        ) : (
          <p style={{ textAlign: "center", margin: "auto", color: "#888" }}>
            💬 Chọn người để bắt đầu trò chuyện
          </p>
        )}
      </ChatWrapper>
    </Container>
  );
};

export default ChatPage;
