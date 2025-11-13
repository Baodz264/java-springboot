import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useContext,
  useCallback,
} from "react";
import {
  Container,
  ChatWrapper,
  MessagesWrapper,
  MessageItem,
  MessageBubble,
  AvatarWrapper,
  UserAvatar,
  UserName,
  UserListWrapper,
  UserItem,
  UserInfo,
  LastMessage,
  UnreadBadge,
  ChatFormWrapper,
  InputWrapper,
  Input,
  FileInputLabel,
  FileInput,
  SendButton,
} from "./style";
import { FiSend, FiImage } from "react-icons/fi";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import UserService from "../../../services/userService";
import chatService from "../../../services/chatService";
import { UserContext } from "../../../contexts/UserContext";

// =============================
// ChatForm
// =============================
const ChatForm = ({ onSend, disabled }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    if (text.trim() || file) {
      await onSend(text, file);
      setText("");
      setFile(null);
    }
  };

  return (
    <ChatFormWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={disabled ? "Đang kết nối..." : "Nhập tin nhắn..."}
          disabled={disabled}
        />
        <FileInputLabel htmlFor="file-upload">
          <FiImage size={20} />
        </FileInputLabel>
        <FileInput
          id="file-upload"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={disabled}
        />
      </InputWrapper>
      <SendButton type="submit" disabled={disabled}>
        <FiSend size={20} />
      </SendButton>
    </ChatFormWrapper>
  );
};

// =============================
// ChatList
// =============================
const ChatList = ({ messages, currentUserId, users = [] }) => {
  const bottomRef = useRef();
  const getUser = (userId) =>
    users.find((u) => u.id === userId) || { fullName: "Unknown", avatarUrl: "" };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <MessagesWrapper>
      {messages.map((msg, index) => {
        const isOwn = msg.senderId === currentUserId;
        const sender = getUser(msg.senderId);
        return (
          <MessageItem key={msg._key || index} $isOwn={isOwn}>
            {!isOwn && (
              <AvatarWrapper>
                <UserAvatar
                  src={
                    sender.avatarUrl
                      ? `http://localhost:8080${sender.avatarUrl}`
                      : "/default-avatar.png"
                  }
                  alt={sender.fullName}
                />
              </AvatarWrapper>
            )}
            <div>
              {!isOwn && <UserName>{sender.fullName}</UserName>}
              <MessageBubble $isOwn={isOwn}>
                {msg.message && <p>{msg.message}</p>}
                {msg.imageUrl && (
                  <img
                    src={
                      msg.imageUrl.startsWith("http")
                        ? msg.imageUrl
                        : `http://localhost:8080${msg.imageUrl}`
                    }
                    alt="chat-img"
                    style={{ maxWidth: "200px", borderRadius: "8px" }}
                  />
                )}
              </MessageBubble>
            </div>
          </MessageItem>
        );
      })}
      <div ref={bottomRef} />
    </MessagesWrapper>
  );
};

// =============================
// ChatUserList
// =============================
const ChatUserList = ({ users = [], selectedUser, onSelectUser, messages = [], currentUserId }) => {
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

  return (
    <UserListWrapper>
      {users
        .filter((u) => u.id !== currentUserId)
        .map((user) => {
          const { lastMsg, unreadCount } = userChatData[user.id] || {};
          return (
            <UserItem
              key={user.id}
              selected={selectedUser?.id === user.id}
              onClick={() => onSelectUser(user)}
            >
              <UserAvatar
                src={
                  user.avatarUrl
                    ? `http://localhost:8080${user.avatarUrl}`
                    : "/default-avatar.png"
                }
              />
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

// =============================
// ChatPage
// =============================
const ChatPage = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const currentUserId = user?.id;

  // Fetch users
  useEffect(() => {
    if (!currentUserId) return;
    UserService.getAll().then(setUsers).catch(console.error);
  }, [currentUserId]);

  // Fetch chat history
  const fetchMessages = useCallback(
    async (userId) => {
      if (!currentUserId) return;
      try {
        const chats = await chatService.getChatBetweenUsers(currentUserId, userId);
        setMessages(chats.map((chat, idx) => ({ ...chat, _key: `${chat.id}-${idx}` })));
      } catch (err) {
        console.error(err);
        setMessages([]);
      }
    },
    [currentUserId]
  );

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.id);
  }, [selectedUser, fetchMessages]);

  // Connect WebSocket
  useEffect(() => {
    if (!currentUserId) return;

    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket connected");
        stompClient.current.subscribe(`/user/${currentUserId}/queue/messages`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          if (
            selectedUser &&
            (newMsg.senderId === selectedUser.id || newMsg.receiverId === selectedUser.id)
          ) {
            setMessages((prev) => [...prev, { ...newMsg, _key: `${newMsg.id}-${prev.length}` }]);
          }
        });
      },
      onStompError: (frame) => console.error("STOMP error:", frame.headers["message"]),
    });
    stompClient.current.activate();
    return () => stompClient.current?.deactivate();
  }, [currentUserId, selectedUser]);

  // Send message dùng chatService
  const handleSend = async (text, file) => {
    if (!selectedUser) return;

    // Hiển thị tạm thời
    const tempMessage = {
      senderId: currentUserId,
      receiverId: selectedUser.id,
      message: text,
      imageUrl: file ? URL.createObjectURL(file) : null,
      _key: `temp-${Date.now()}`,
    };
    setMessages((prev) => [...prev, tempMessage]);

    try {
      const savedMessage = await chatService.sendMessage({
        senderId: currentUserId,
        receiverId: selectedUser.id,
        message: text,
        imageFile: file || null,
      });

      // Cập nhật message tạm với dữ liệu server
      setMessages((prev) =>
        prev.map((msg) =>
          msg._key === tempMessage._key
            ? { ...savedMessage, _key: `${savedMessage.id}-${Date.now()}` }
            : msg
        )
      );
    } catch (err) {
      console.error("Send message failed:", err);
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
        <ChatList messages={messages} currentUserId={currentUserId} users={users} />
        {selectedUser && <ChatForm onSend={handleSend} disabled={!stompClient.current?.connected} />}
      </ChatWrapper>
    </Container>
  );
};

export default ChatPage;
