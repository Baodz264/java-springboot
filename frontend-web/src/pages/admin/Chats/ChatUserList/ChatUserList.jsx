import React, { useMemo } from "react";
import {
  UserListWrapper,
  UserItem,
  UserAvatar,
  UserInfo,
  UserName,
  LastMessage,
  UnreadBadge,
} from "./style";

const ChatUserList = ({
  users = [],
  selectedUser,
  onSelectUser,
  messages = [],
}) => {
  // 🟢 Lấy thông tin admin đang đăng nhập
  const adminUser = JSON.parse(localStorage.getItem("admin_user"));
  const currentUserId = adminUser?.id;

  // 🟡 Tạo map userId → tin nhắn cuối + số chưa đọc
  const userChatData = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      const userMessages = messages.filter(
        (msg) =>
          (msg.senderId === user.id && msg.receiverId === currentUserId) ||
          (msg.senderId === currentUserId && msg.receiverId === user.id)
      );

      if (userMessages.length > 0) {
        const lastMsg = userMessages[userMessages.length - 1];
        const unreadCount = userMessages.filter(
          (msg) => !msg.read && msg.senderId === user.id
        ).length;
        map[user.id] = { lastMsg, unreadCount };
      } else {
        map[user.id] = { lastMsg: null, unreadCount: 0 };
      }
    });
    return map;
  }, [users, messages, currentUserId]);

  // 🟢 Không hiển thị chính mình trong danh sách
  const filteredUsers = users.filter((u) => u.id !== currentUserId);

  return (
    <UserListWrapper>
      {filteredUsers.map((user) => {
        const { lastMsg, unreadCount } = userChatData[user.id] || {};

        const avatarSrc = user.avatarUrl
          ? user.avatarUrl.startsWith("http")
            ? user.avatarUrl
            : `http://localhost:8080${user.avatarUrl}`
          : "/default-avatar.png";

        return (
          <UserItem
            key={user.id}
            selected={selectedUser?.id === user.id}
            onClick={() => onSelectUser(user)}
          >
            <UserAvatar src={avatarSrc} alt={user.fullName} />
            <UserInfo>
              <UserName>{user.fullName}</UserName>
              {lastMsg && (
                <LastMessage>
                  {lastMsg.message
                    ? lastMsg.message.length > 30
                      ? lastMsg.message.slice(0, 30) + "..."
                      : lastMsg.message
                    : lastMsg.imageUrl
                    ? "📷 Hình ảnh"
                    : ""}
                </LastMessage>
              )}
            </UserInfo>
            {unreadCount > 0 && <UnreadBadge>{unreadCount}</UnreadBadge>}
          </UserItem>
        );
      })}
    </UserListWrapper>
  );
};

export default ChatUserList;
