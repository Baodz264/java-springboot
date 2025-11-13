// src/services/PaymentService.js
import api from "./api";

const PaymentService = {
  // Lấy tất cả payment
  getAll: async () => {
    try {
      const response = await api.get("/payments");
      return response.data;
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  },

  // Lấy payment theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching payment with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo payment
  create: async (payment) => {
    try {
      const response = await api.post("/payments", payment);
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  },

  // Cập nhật payment
  update: async (id, payment) => {
    try {
      const response = await api.put(`/payments/${id}`, payment);
      return response.data;
    } catch (error) {
      console.error(`Error updating payment with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa payment
  delete: async (id) => {
    try {
      await api.delete(`/payments/${id}`);
    } catch (error) {
      console.error(`Error deleting payment with id ${id}:`, error);
      throw error;
    }
  },
    // 🔍 Search payment theo keyword, provider, status, minAmount, maxAmount
  search: async ({ keyword, provider, status, minAmount, maxAmount }) => {
    try {
      const response = await api.get("/payments/search", {
        params: { keyword, provider, status, minAmount, maxAmount },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching payments:", error);
      throw error;
    }
  },
};

export default PaymentService;
