// src/services/OrderService.js
import api from "./api";

const OrderService = {
  // Lấy tất cả đơn hàng
  getAll: async () => {
    try {
      const response = await api.get("/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Lấy đơn hàng theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo đơn hàng
  create: async (order) => {
    try {
      const response = await api.post("/orders", order);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Cập nhật đơn hàng
  update: async (id, order) => {
    try {
      const response = await api.put(`/orders/${id}`, order);
      return response.data;
    } catch (error) {
      console.error(`Error updating order with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa đơn hàng
  delete: async (id) => {
    try {
      await api.delete(`/orders/${id}`);
    } catch (error) {
      console.error(`Error deleting order with id ${id}:`, error);
      throw error;
    }
  },
  // 🔍 Search đơn hàng theo status, paymentMethod, userId, address
  search: async ({ status, paymentMethod, userId, address }) => {
    try {
      const response = await api.get("/orders/search", {
        params: { status, paymentMethod, userId, address },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching orders:", error);
      throw error;
    }
  },
    // 🧾 Xuất file Excel
  exportExcel: async () => {
    try {
      const response = await api.get("/orders/export", {
        responseType: "blob", // ⚠️ Quan trọng để nhận file nhị phân
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting Excel:", error);
      throw error;
    }
  },
};

export default OrderService;
