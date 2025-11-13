import api from "./api";

const CartService = {
  // 🟢 Lấy tất cả giỏ hàng
  getAll: async () => {
    try {
      const { data } = await api.get("/carts");
      return { success: true, data };
    } catch (error) {
      console.error("❌ Error fetching carts:", error);
      return { success: false, error };
    }
  },

  // 🔍 Lấy giỏ hàng theo ID
  getById: async (id) => {
    try {
      const { data } = await api.get(`/carts/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error fetching cart ${id}:`, error);
      return { success: false, error };
    }
  },

  // ➕ Tạo mới giỏ hàng
  create: async (cartRequest) => {
    try {
      const { data } = await api.post("/carts", cartRequest);
      return { success: true, data };
    } catch (error) {
      console.error("❌ Error creating cart:", error);
      return { success: false, error };
    }
  },

  // ✏️ Cập nhật giỏ hàng
  update: async (id, cartRequest) => {
    try {
      const { data } = await api.put(`/carts/${id}`, cartRequest);
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error updating cart ${id}:`, error);
      return { success: false, error };
    }
  },

  // 🗑️ Xóa giỏ hàng
  delete: async (id) => {
    try {
      await api.delete(`/carts/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`❌ Error deleting cart ${id}:`, error);
      return { success: false, error };
    }
  },

  // 🔎 Tìm giỏ hàng theo userId
  searchByUserId: async (userId) => {
    try {
      const { data } = await api.get(`/carts/search`, { params: { userId } });
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error searching carts for user ${userId}:`, error);
      return { success: false, error };
    }
  },
};

export default CartService;
