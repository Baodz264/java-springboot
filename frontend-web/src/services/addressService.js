// src/services/AddressService.js
import api from "./api";

const AddressService = {
  // Lấy tất cả địa chỉ
  getAll: async () => {
    try {
      const response = await api.get("/addresses");
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  },

  // Lấy địa chỉ theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching address with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo địa chỉ mới
  create: async (address) => {
    try {
      const response = await api.post("/addresses", address);
      return response.data;
    } catch (error) {
      console.error("Error creating address:", error);
      throw error;
    }
  },

  // Cập nhật địa chỉ
  update: async (id, address) => {
    try {
      const response = await api.put(`/addresses/${id}`, address);
      return response.data;
    } catch (error) {
      console.error(`Error updating address with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa địa chỉ
  delete: async (id) => {
    try {
      await api.delete(`/addresses/${id}`);
    } catch (error) {
      console.error(`Error deleting address with id ${id}:`, error);
      throw error;
    }
  },

  // 🔎 Tìm kiếm địa chỉ
  search: async (keyword) => {
    try {
      const response = await api.get(`/addresses/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error searching addresses with keyword "${keyword}":`,
        error
      );
      throw error;
    }
  },
};

export default AddressService;
