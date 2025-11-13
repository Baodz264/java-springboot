// src/services/VoucherService.js
import api from "./api";

const VoucherService = {
  getAll: async () => {
    try {
      const response = await api.get("/vouchers");
      return response.data;
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/vouchers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching voucher with id ${id}:`, error);
      throw error;
    }
  },

  create: async (voucher, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("voucher", JSON.stringify(voucher));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.post("/vouchers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating voucher:", error);
      throw error;
    }
  },

  update: async (id, voucher, imageFile) => {
    try {
      const formData = new FormData();

      // bỏ những field không có trong VoucherRequest
      const { id: _, createdAt, updatedAt, ...voucherData } = voucher;

      formData.append("voucher", JSON.stringify(voucherData));
      if (imageFile) formData.append("image", imageFile);

      const response = await api.put(`/vouchers/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating voucher with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await api.delete(`/vouchers/${id}`);
    } catch (error) {
      console.error(`Error deleting voucher with id ${id}:`, error);
      throw error;
    }
  },
    // 🔍 Search vouchers
  search: async (keyword) => {
    try {
      const response = await api.get("/vouchers/search", {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching vouchers:", error);
      throw error;
    }
  },
};

export default VoucherService;
