// src/services/ShippingService.js
import api from "./api";

const ShippingService = {
  // Lấy tất cả shipping
  getAll: async () => {
    try {
      const response = await api.get("/shippings");
      return response.data;
    } catch (error) {
      console.error("Error fetching shippings:", error);
      throw error;
    }
  },

  // Lấy shipping theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/shippings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching shipping with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo shipping
  create: async (shipping) => {
    try {
      const response = await api.post("/shippings", shipping);
      return response.data;
    } catch (error) {
      console.error("Error creating shipping:", error);
      throw error;
    }
  },

  // Cập nhật shipping
  update: async (id, shipping) => {
    try {
      const response = await api.put(`/shippings/${id}`, shipping);
      return response.data;
    } catch (error) {
      console.error(`Error updating shipping with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa shipping
  delete: async (id) => {
    try {
      await api.delete(`/shippings/${id}`);
    } catch (error) {
      console.error(`Error deleting shipping with id ${id}:`, error);
      throw error;
    }
  },
  // 🔍 Search shipping
  search: async (keyword) => {
    try {
      const response = await api.get("/shippings/search", {
        params: { keyword },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching shippings:", error);
      throw error;
    }
  },
};

export default ShippingService;
