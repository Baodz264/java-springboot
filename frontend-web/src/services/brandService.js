// src/services/BrandService.js
import api from "./api";

const BrandService = {
  // Lấy tất cả brand
  getAll: async () => {
    try {
      const response = await api.get("/brands");
      return response.data;
    } catch (error) {
      console.error("Error fetching brands:", error);
      throw error;
    }
  },

  // Lấy brand theo id
  getById: async (id) => {
    try {
      const response = await api.get(`/brands/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo brand mới
  create: async (brand, logoFile) => {
    try {
      const formData = new FormData();
      formData.append("brand", JSON.stringify(brand));
      if (logoFile) formData.append("logo", logoFile);

      const response = await api.post("/brands", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  },

  // Cập nhật brand
  update: async (id, brand, logoFile) => {
    try {
      const formData = new FormData();
      formData.append("brand", JSON.stringify(brand));
      if (logoFile) formData.append("logo", logoFile);

      const response = await api.put(`/brands/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating brand with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa brand
  delete: async (id) => {
    try {
      await api.delete(`/brands/${id}`);
    } catch (error) {
      console.error(`Error deleting brand with id ${id}:`, error);
      throw error;
    }
  },

  // Upload logo riêng (nếu cần)
  uploadLogo: async (logoFile) => {
    try {
      const formData = new FormData();
      formData.append("logo", logoFile);

      const response = await api.post("/brands/upload-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data; // trả về URL logo
    } catch (error) {
      console.error("Error uploading logo:", error);
      throw error;
    }
  },
  // Tìm kiếm brand
  search: async (keyword) => {
    try {
      const response = await api.get(`/brands/search?keyword=${keyword}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching brands with keyword "${keyword}":`, error);
      throw error;
    }
  },
};

export default BrandService;
