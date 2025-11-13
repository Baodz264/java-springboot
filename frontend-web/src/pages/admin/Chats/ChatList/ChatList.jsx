import React, { useEffect, useRef } from "react";
import {
  MessagesWrapper,
  MessageItem,
  MessageBubble,
  AvatarWrapper,
  UserName,
  UserAvatar,
} from "./style";

const ChatList = ({ messages = [], currentUserId, users = [] }) => {
  const bottomRef = useRef(null);

  // ✅ Lấy thông tin người dùng từ danh sách users
  const getUser = (userId) => {
    return (
      users.find((u) => u.id === userId) || {
        fullName: "Người dùng",
        avatarUrl: "",
      }
    );
  };

  // ✅ Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MessagesWrapper>
      {messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>
          💬 Chưa có tin nhắn nào
        </p>
      ) : (
        messages.map((msg, index) => {
          const isOwn = msg.senderId === currentUserId;
          const sender = getUser(msg.senderId);

          // ✅ Xử lý đường dẫn ảnh avatar (có thể từ server)
          const avatarSrc = sender.avatarUrl
            ? sender.avatarUrl.startsWith("http")
              ? sender.avatarUrl
              : `http://localhost:8080${sender.avatarUrl}`
            : "https://i.pravatar.cc/40";

          // ✅ Xử lý đường dẫn ảnh trong tin nhắn
          const imageSrc =
            msg.imageUrl &&
            (msg.imageUrl.startsWith("http")
              ? msg.imageUrl
              : `http://localhost:8080${msg.imageUrl}`);

          return (
            <MessageItem key={msg.id || msg._key || index} $isOwn={isOwn}>
              {/* Avatar của người khác */}
              {!isOwn && (
                <AvatarWrapper>
                  <UserAvatar src={avatarSrc} alt={sender.fullName} />
                </AvatarWrapper>
              )}

              <div>
                {/* Hiển thị tên người gửi nếu không phải mình */}
                {!isOwn && <UserName>{sender.fullName}</UserName>}

                <MessageBubble $isOwn={isOwn}>
                  {msg.message && <p>{msg.message}</p>}

                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="chat-img"
                      style={{
                        maxWidth: "200px",
                        borderRadius: "10px",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </MessageBubble>
              </div>
            </MessageItem>
          );
        })
      )}
      {/* Scroll to bottom */}
      <div ref={bottomRef} />
    </MessagesWrapper>
  );
};

export default ChatList;
