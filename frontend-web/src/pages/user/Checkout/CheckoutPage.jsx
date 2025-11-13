import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  VoucherContainer,
  VoucherInput,
  ApplyButton,
  VoucherList,
  VoucherItem,
} from "./style";
import { UserContext } from "../../../contexts/UserContext";
import { useToast } from "../../../contexts/ToastProvider";

import AddressSection from "../../../components/user/Checkout/AddressSection/AddressSection";
import CartItems from "../../../components/user/Checkout/CartItems/CartItems";
import ShippingPaymentSection from "../../../components/user/Checkout/ShippingPaymentSection/ShippingPaymentSection";
import OrderSummary from "../../../components/user/Checkout/OrderSummary/OrderSummary";

import OrderService from "../../../services/orderService";
import { createOrderItem } from "../../../services/orderItemService";
import ShippingService from "../../../services/shippingService";
import PaymentService from "../../../services/paymentService";
import CartItemService from "../../../services/cartItemService";
import ProductVariantService from "../../../services/productVariantService";
import ProductService from "../../../services/productService";
import VoucherService from "../../../services/voucherService";
import VNPayService from "../../../services/vnpayService";

const shippingOptions = [
  { id: 1, name: "Giao hàng tiêu chuẩn", fee: 30000 },
  { id: 2, name: "Giao hàng nhanh", fee: 50000 },
];

const paymentMethods = [
  { id: "COD", name: "Thanh toán khi nhận hàng (COD)" },
  { id: "BANK", name: "Chuyển khoản ngân hàng" },
  { id: "VNPAY", name: "Thanh toán qua VNPay" },
];

const generateTransactionCode = () => {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 10000);
  return `TX${timestamp}${randomPart}`;
};

export default function CheckoutPage() {
  const { user } = useContext(UserContext);
  const stateData = window.history.state?.usr || {};
  const navigate = useNavigate();
  const toast = useToast();

  const [cartItems, setCartItems] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherList, setVoucherList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load giỏ hàng
  useEffect(() => {
    const loadCart = async () => {
      try {
        let items = Array.isArray(stateData.cartItems)
          ? stateData.cartItems
          : [];

        if ((!items || items.length === 0) && user) {
          const allOrders = await OrderService.getAll();
          if (Array.isArray(allOrders?.data)) {
            const userCart = allOrders.data.find(
              (order) => order.userId === user.id
            );
            if (userCart && userCart.id) {
              const itemsRes = await CartItemService.searchByCartId(
                userCart.id
              );
              if (itemsRes.success && Array.isArray(itemsRes.data))
                items = itemsRes.data;
            }
          }
        }

        const enrichedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const variantRes = await ProductVariantService.getById(
                item.productVariantId
              );
              const variant = variantRes?.data || variantRes;
              const productRes = await ProductService.getById(
                variant?.productId
              );
              const product = productRes?.data || productRes;
              return {
                ...item,
                productVariant: variant,
                product,
                selected: true,
              };
            } catch {
              return {
                ...item,
                productVariant: null,
                product: null,
                selected: true,
              };
            }
          })
        );

        const selectedMap = {};
        enrichedItems.forEach((item) => (selectedMap[item.id] = true));
        setSelectedItems(selectedMap);
        setCartItems(enrichedItems);
      } catch (err) {
        console.error("Lỗi load giỏ hàng:", err);
        toast.error("Không thể tải giỏ hàng!");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [user, stateData.cartItems, toast]);

  // Load voucher
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await VoucherService.getAll();
        setVoucherList(Array.isArray(data) ? data : []);
      } catch {
        toast.error("Không thể tải voucher!");
      }
    };
    fetchVouchers();
  }, [toast]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleSelect = (id, isSelected) => {
    setSelectedItems((prev) => ({ ...prev, [id]: isSelected }));
  };

  const selectedCartItems = cartItems.filter((item) => selectedItems[item.id]);

  const handleApplyVoucher = (v = null) => {
    const codeToCheck = v?.code || voucher.trim();
    const found = voucherList.find(
      (vc) => vc.code?.toUpperCase() === codeToCheck.toUpperCase()
    );

    if (!found) {
      setDiscount(0);
      toast.error("Voucher không hợp lệ hoặc đã hết hạn!");
      return;
    }

    const subtotal = selectedCartItems.reduce((sum, item) => {
      const unitPrice =
        (item.product?.price || 0) + (item.productVariant?.extraPrice || 0);
      return sum + unitPrice * (item.quantity || 0);
    }, 0);

    const discountValue =
      found.discountType === "PERCENT"
        ? subtotal * (found.discountValue / 100)
        : found.discountValue;

    setVoucher(found.code);
    setDiscount(discountValue);
    toast.success(`Áp dụng voucher "${found.code}" thành công!`);
  };

  const subtotal = selectedCartItems.reduce((sum, item) => {
    const unitPrice =
      (item.product?.price || 0) + (item.productVariant?.extraPrice || 0);
    return sum + unitPrice * (item.quantity || 0);
  }, 0);
  const shippingFee = selectedShipping.fee;
  const total = subtotal + shippingFee - discount;

  // ✅ handleCheckout với checkOnly
  const handleCheckoutWithDelay = async (checkOnly = false) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thanh toán");
      return false;
    }
    if (!selectedAddress) {
      toast.error("Vui lòng chọn địa chỉ");
      return false;
    }
    if (selectedCartItems.length === 0) {
      toast.error("Vui lòng chọn sản phẩm");
      return false;
    }

    if (checkOnly) return true; // chỉ check điều kiện

    setIsProcessing(true);
    try {
      if (selectedPayment === "COD") {
        const orderPayload = {
          userId: user.id,
          shippingAddress: `${selectedAddress.addressLine}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`,
          paymentMethod: selectedPayment,
          totalPrice: total,
          voucherCode: voucher || null,
          discountAmount: discount || 0,
        };
        const newOrder = await OrderService.create(orderPayload);

        await Promise.all(
          selectedCartItems.map((item) =>
            createOrderItem({
              orderId: newOrder.id,
              productVariantId: item.productVariant?.id,
              quantity: item.quantity,
              price:
                (item.product?.price || 0) +
                (item.productVariant?.extraPrice || 0),
            })
          )
        );

        await ShippingService.create({
          orderId: newOrder.id,
          shippingAddress: orderPayload.shippingAddress,
          shippingProvider: selectedShipping.name,
          shippingFee,
          status: "PENDING",
        });

        await PaymentService.create({
          amount: total,
          provider: "COD",
          status: "PENDING",
          transactionCode: generateTransactionCode(),
          orderId: newOrder.id,
        });

        await Promise.all(
          selectedCartItems.map((item) => CartItemService.delete(item.id))
        );
        window.dispatchEvent(new Event("cartUpdated"));

        toast.success("Đặt hàng thành công (COD)!");
        navigate("/");
      } else if (selectedPayment === "VNPAY") {
        const pendingOrder = {
          userId: user.id,
          shippingAddress: `${selectedAddress.addressLine}, ${selectedAddress.ward}, ${selectedAddress.district}, ${selectedAddress.city}`,
          paymentMethod: selectedPayment,
          totalPrice: total,
          voucherCode: voucher || null,
          discountAmount: discount || 0,
          shippingProvider: selectedShipping.name,
          shippingFee,
          cartItems: selectedCartItems.map((item) => ({
            id: item.id,
            productVariantId: item.productVariant?.id,
            quantity: item.quantity,
            price:
              (item.product?.price || 0) +
              (item.productVariant?.extraPrice || 0),
          })),
        };
        localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));

        const paymentData = {
          orderId: Date.now(),
          amount: total,
          bankCode: "VNBANK",
          locale: "vn",
          returnUrl: "http://localhost:3000/payment/vnpay-return",
        };

        const paymentUrl = await VNPayService.createPayment(paymentData);
        if (paymentUrl) window.location.href = paymentUrl;
      } else {
        toast.info(`Phương thức ${selectedPayment} chưa được hỗ trợ`);
      }
      return true;
    } catch (err) {
      console.error("❌ Lỗi khi thanh toán:", err);
      toast.error("Thanh toán thất bại, vui lòng thử lại!");
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <Container>Đang tải giỏ hàng...</Container>;

  return (
    <Container>
      <Title>Thanh toán</Title>
      <AddressSection user={user} onSelectAddress={setSelectedAddress} />
      <CartItems
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onSelect={handleSelect}
      />
      <VoucherContainer>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <VoucherInput
            placeholder="Nhập mã voucher"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <ApplyButton onClick={() => handleApplyVoucher()}>
            Áp dụng
          </ApplyButton>
        </div>
        <VoucherList>
          {voucherList.map((v) => (
            <VoucherItem
              key={v.id}
              disabled={v.claimed}
              claimed={v.claimed}
              onClick={() => !v.claimed && handleApplyVoucher(v)}
            >
              {v.code} {v.claimed ? "(Đã nhận)" : ""}
            </VoucherItem>
          ))}
        </VoucherList>
      </VoucherContainer>
      <ShippingPaymentSection
        shippingOptions={shippingOptions}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
        paymentMethods={paymentMethods}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
      <OrderSummary
        subtotal={subtotal}
        shippingFee={shippingFee}
        discount={discount}
        total={total}
        handleCheckout={handleCheckoutWithDelay}
        isProcessing={isProcessing}
      />
    </Container>
  );
}
