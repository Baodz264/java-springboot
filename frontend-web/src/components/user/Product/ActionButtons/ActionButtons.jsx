import React, { useContext } from "react";
import { ShoppingCart } from "lucide-react";
import { useToast } from "../../../../contexts/ToastProvider";
import { UserContext } from "../../../../contexts/UserContext";
import CartService from "../../../../services/cartService";
import CartItemService from "../../../../services/cartItemService";
import { ButtonGroup, AddToCartBtn } from "./style";

const ActionButtons = ({ productId, quantity = 1, variant }) => {
  const { user } = useContext(UserContext);
  const toast = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }

    if (!variant || !variant.id) {
      toast.warning("Vui lòng chọn biến thể sản phẩm");
      return;
    }

    try {
      // Lấy giỏ hàng của user
      const resCart = await CartService.searchByUserId(user.id);
      if (!resCart.success) throw resCart.error;

      let userCart =
        Array.isArray(resCart.data) && resCart.data.length > 0
          ? resCart.data[0]
          : null;

      // Nếu chưa có giỏ → tạo mới
      if (!userCart) {
        const createRes = await CartService.create({ userId: user.id });
        if (!createRes.success) throw createRes.error;
        userCart = createRes.data;
      }

      // Lấy danh sách sản phẩm trong giỏ
      const itemsRes = await CartItemService.searchByCartId(userCart.id);
      if (!itemsRes.success) throw itemsRes.error;

      let cartItems = Array.isArray(itemsRes.data) ? itemsRes.data : [];

      // Kiểm tra xem biến thể đã có chưa
      const existingItem = cartItems.find(
        (i) => i.productVariant?.id === variant.id
      );

      if (existingItem) {
        // Cập nhật số lượng
        const updateRes = await CartItemService.update(existingItem.id, {
          cartId: userCart.id,
          productVariantId: variant.id,
          quantity: existingItem.quantity + quantity,
        });
        if (!updateRes.success) throw updateRes.error;

        existingItem.quantity += quantity;
      } else {
        // Thêm mới
        const createItemRes = await CartItemService.create({
          cartId: userCart.id,
          productVariantId: variant.id,
          quantity,
        });
        if (!createItemRes.success) throw createItemRes.error;

        cartItems.push({
          id: createItemRes.data.id,
          productVariant: variant,
          quantity,
        });
      }

      // Lưu localStorage + dispatch event
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Thêm sản phẩm vào giỏ thành công!");
    } catch (err) {
      console.error("Lỗi thêm giỏ hàng:", err);
      toast.error("Thao tác thất bại!");
    }
  };

  if (!variant) {
    return (
      <ButtonGroup>
        <AddToCartBtn disabled>
          <ShoppingCart size={20} />
          <span>Vui lòng chọn biến thể</span>
        </AddToCartBtn>
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroup>
      <AddToCartBtn onClick={handleAddToCart}>
        <ShoppingCart size={20} />
        <span>Thêm vào giỏ</span>
      </AddToCartBtn>
    </ButtonGroup>
  );
};

export default ActionButtons;
