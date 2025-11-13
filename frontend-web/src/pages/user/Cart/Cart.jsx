import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, ProductList } from "./style";

import { UserContext } from "../../../contexts/UserContext";
import CartService from "../../../services/cartService";
import CartItemService from "../../../services/cartItemService";
import ProductVariantService from "../../../services/productVariantService";
import ProductService from "../../../services/productService";

import CartItem from "./CartItem/CartItem";
import VoucherSection from "./VoucherSection/VoucherSection";
import SummarySection from "./SummarySection/SummarySection";

const shippingFee = 30000;

function Cart() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  // ✅ fetchCart dùng useCallback
  const fetchCart = useCallback(async () => {
    if (!user?.id) return;

    try {
      const res = await CartService.searchByUserId(user.id);
      if (!res.success) throw res.error;

      let userCart = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : null;

      if (!userCart) {
        const createRes = await CartService.create({ userId: user.id });
        if (!createRes.success) throw createRes.error;
        userCart = createRes.data;
      }
      setCart(userCart);

      const itemsRes = await CartItemService.searchByCartId(userCart.id);
      if (!itemsRes.success) throw itemsRes.error;

      // ✅ đảm bảo itemsRes.data là mảng
      const itemsArray = Array.isArray(itemsRes.data) ? itemsRes.data : [];

      const enrichedItems = await Promise.all(
        itemsArray.map(async (item) => {
          try {
            const variantRes = await ProductVariantService.getById(item.productVariantId);
            const variant = variantRes?.data || variantRes;

            const productRes = await ProductService.getById(variant.productId);
            const product = productRes?.data || productRes;

            return { ...item, productVariant: variant, product };
          } catch (err) {
            console.error("❌ Lỗi fetch variant/product:", err);
            return item;
          }
        })
      );

      setCartItems(enrichedItems);

      const defaultSelected = {};
      enrichedItems.forEach((i) => (defaultSelected[i.id] = false));
      setSelectedItems(defaultSelected);
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);
      alert("Không thể load giỏ hàng!");
      setCartItems([]); // đảm bảo cartItems luôn là mảng
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // --- Các hàm xử lý ---
  const handleQuantityChange = async (itemId, delta) => {
    try {
      const item = cartItems.find((i) => i.id === itemId);
      if (!item) return;

      const newQuantity = Math.max(1, item.quantity + delta);

      const res = await CartItemService.update(itemId, {
        cartId: cart.id,
        productVariantId: item.productVariantId,
        quantity: newQuantity,
      });
      if (!res.success) throw res.error;

      setCartItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
      alert("Cập nhật số lượng thất bại!");
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await CartItemService.delete(itemId);
      if (!res.success) throw res.error;

      setCartItems((prev) => prev.filter((i) => i.id !== itemId));
      setSelectedItems((prev) => {
        const newSelected = { ...prev };
        delete newSelected[itemId];
        return newSelected;
      });
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
      alert("Xóa sản phẩm thất bại!");
    }
  };

  const handleSelect = (id, checked) => {
    setSelectedItems((prev) => ({ ...prev, [id]: checked }));
  };

  const handleDeleteSelected = async () => {
    const idsToDelete = Object.keys(selectedItems).filter((id) => selectedItems[id]);
    for (const id of idsToDelete) {
      await handleRemove(parseInt(id));
    }
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) => selectedItems[item.id]);
    if (itemsToCheckout.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán!");
      return;
    }
    navigate("/checkout", { state: { cart, cartItems: itemsToCheckout, discount } });
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems[item.id]);

  const subtotal = selectedCartItems.reduce((sum, item) => {
    const unitPrice = (item.product?.price || 0) + (item.productVariant?.extraPrice || 0);
    return sum + unitPrice * (item.quantity || 0);
  }, 0);

  const discountAmount = discount <= 1 ? subtotal * discount : discount;
  const total = subtotal + (selectedCartItems.length > 0 ? shippingFee : 0) - discountAmount;

  useEffect(() => {
    if (selectedCartItems.length === 0) setDiscount(0);
  }, [selectedCartItems.length]);

  return (
    <Container>
      <Title>Giỏ hàng của bạn</Title>

      <ProductList>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{ ...item, selected: selectedItems[item.id] }}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onSelect={handleSelect}
            />
          ))
        )}
      </ProductList>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleDeleteSelected}
          disabled={Object.values(selectedItems).every((v) => !v)}
        >
          Xóa sản phẩm đã chọn
        </button>
      </div>

      <VoucherSection voucher={voucher} setVoucher={setVoucher} setDiscount={setDiscount} />

      <SummarySection
        subtotal={subtotal}
        shippingFee={selectedCartItems.length > 0 ? shippingFee : 0}
        discount={discountAmount}
        total={total}
        onCheckout={handleCheckout}
      />
    </Container>
  );
}

export default Cart;
