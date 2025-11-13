import api from "./api";

const UserService = {
  // Lấy tất cả user
  getAll: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Lấy user theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo user mới (có thể upload avatar)
  create: async (user, avatarFile) => {
    try {
      const formData = new FormData();
      // gửi user dưới dạng JSON blob (Spring Boot đọc được)
      formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await api.post("/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Cập nhật user (có thể thay avatar)
  update: async (id, user, avatarFile) => {
    try {
      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await api.put(`/users/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa user
  delete: async (id) => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  },

  // Upload avatar riêng lẻ
  uploadAvatar: async (avatarFile) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await api.post("/users/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // trả về URL ảnh
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw error;
    }
  },

  // 🔍 Search user
  search: async (keyword) => {
    try {
      const response = await api.get("/users/search", {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  },
};

export default UserService;
