import api from "./api";

const CartItemService = {
  // 🟢 Lấy tất cả cart items
  getAll: async () => {
    try {
      const { data } = await api.get("/cart-items");
      return { success: true, data };
    } catch (error) {
      console.error("❌ Error fetching cart items:", error);
      return { success: false, error };
    }
  },

  // 🔍 Lấy cart item theo ID
  getById: async (id) => {
    try {
      const { data } = await api.get(`/cart-items/${id}`);
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error fetching cart item ${id}:`, error);
      return { success: false, error };
    }
  },

  // ➕ Tạo mới cart item
  create: async (cartItemRequest) => {
    try {
      const { data } = await api.post("/cart-items", cartItemRequest);
      return { success: true, data };
    } catch (error) {
      console.error("❌ Error creating cart item:", error);
      return { success: false, error };
    }
  },

  // ✏️ Cập nhật cart item
  update: async (id, cartItemRequest) => {
    try {
      const { data } = await api.put(`/cart-items/${id}`, cartItemRequest);
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error updating cart item ${id}:`, error);
      return { success: false, error };
    }
  },

  // 🗑️ Xóa cart item
  delete: async (id) => {
    try {
      await api.delete(`/cart-items/${id}`);
      return { success: true };
    } catch (error) {
      console.error(`❌ Error deleting cart item ${id}:`, error);
      return { success: false, error };
    }
  },

  // 🔎 Tìm cart items theo cartId
  searchByCartId: async (cartId) => {
    try {
      const { data } = await api.get("/cart-items/search/by-cart", { params: { cartId } });
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error searching cart items for cart ${cartId}:`, error);
      return { success: false, error };
    }
  },

  // 🔎 Tìm cart items theo productVariantId
  searchByVariantId: async (variantId) => {
    try {
      const { data } = await api.get("/cart-items/search/by-variant", { params: { variantId } });
      return { success: true, data };
    } catch (error) {
      console.error(`❌ Error searching cart items for variant ${variantId}:`, error);
      return { success: false, error };
    }
  },
};

export default CartItemService;
