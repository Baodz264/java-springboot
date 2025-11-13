import api from "./api";

// Gửi tin nhắn (có thể kèm file hình)
const sendMessage = async ({ senderId, receiverId, message, imageFile }) => {
  const formData = new FormData();
  formData.append("senderId", senderId);
  formData.append("receiverId", receiverId);
  if (message) formData.append("message", message);
  if (imageFile) formData.append("image", imageFile);

  const response = await api.post("/chats/send", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Lấy chat giữa 2 user
const getChatBetweenUsers = async (user1Id, user2Id) => {
  const response = await api.get("/chats/between", {
    params: { user1Id, user2Id },
  });
  return response.data;
};

// Đánh dấu chat đã đọc
const markAsRead = async (chatId) => {
  await api.put(`/chats/${chatId}/read`);
};
const searchChats = async ({ senderId, receiverId, keyword, isRead, page = 0, size = 10 }) => {
  const response = await api.get("/chats/search", {
    params: { senderId, receiverId, keyword, isRead, page, size },
  });
  return response.data;
};

// Gán object vào biến trước khi export
const chatService = {
  sendMessage,
  getChatBetweenUsers,
  markAsRead,
  searchChats, 
};

export default chatService;
