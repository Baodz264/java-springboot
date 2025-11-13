import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Header,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderStatus,
  OrderTotal,
  ViewButton,
  DetailSection,
  ProductList,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductVariant,
  ProductPrice,
  Quantity,
  Divider,
  EmptyState,
  LoadingState,
} from "./style";

import { UserContext } from "../../../../contexts/UserContext";
import { useToast } from "../../../../contexts/ToastProvider";
import OrderService from "../../../../services/orderService";
import { searchOrderItems } from "../../../../services/orderItemService";
import ProductService from "../../../../services/productService";
import ProductVariantService from "../../../../services/productVariantService";

import {
  Package,
  ShoppingBag,
  DollarSign,
  ChevronDown,
  ChevronUp,
  MapPin,
  CreditCard,
} from "lucide-react";

const BASE_URL = "http://localhost:8080";

const OrdersTab = () => {
  const { user } = useContext(UserContext);
  const toast = useToast();

  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(true);

  // 🔹 Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const res = await OrderService.search({ userId: user.id });
        let data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.content)
          ? res.content
          : [];
        setOrders(data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy đơn hàng:", err);
        toast.error("Không thể tải danh sách đơn hàng!");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, toast]);

  // 🔹 Mở/đóng chi tiết đơn
  const handleToggleDetail = async (orderId) => {
    if (expandedOrderId === orderId) return setExpandedOrderId(null);

    if (!orderDetails[orderId]) {
      try {
        const resOrder = await OrderService.getById(orderId);
        const order = resOrder?.data || resOrder || {};

        const resItems = await searchOrderItems({ orderId });
        const itemsData = Array.isArray(resItems?.data)
          ? resItems.data
          : Array.isArray(resItems)
          ? resItems
          : [];

        const itemsWithDetail = await Promise.all(
          itemsData.map(async (item) => {
            try {
              const variantRes = await ProductVariantService.getById(
                item.productVariantId
              );
              const variant = variantRes?.data || variantRes || {};

              const productRes = await ProductService.getById(
                variant.productId
              );
              const product = productRes?.data || productRes || {};

              return { ...item, productVariant: variant, product };
            } catch (err) {
              console.error("Lỗi khi load sản phẩm:", err);
              return { ...item, productVariant: null, product: null };
            }
          })
        );

        setOrderDetails((prev) => ({
          ...prev,
          [orderId]: { ...order, items: itemsWithDetail },
        }));
      } catch (err) {
        console.error("❌ Lỗi khi lấy chi tiết đơn:", err);
        toast.error("Không thể tải chi tiết đơn hàng!");
        return;
      }
    }

    setExpandedOrderId(orderId);
  };

  // 🔹 Xử lý URL ảnh
  const getImageSrc = (product, productVariant) => {
    const variantUrl = productVariant?.imageUrl;
    const mainUrl = product?.thumbnailUrl;
    const finalUrl =
      variantUrl?.trim() || mainUrl?.trim() || "/placeholder.png";
    return finalUrl.startsWith("http")
      ? finalUrl
      : `${BASE_URL}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`;
  };

  if (loading) return <LoadingState>⏳ Đang tải đơn hàng...</LoadingState>;

  return (
    <Container>
      <Header>Đơn hàng của bạn 🛍️</Header>

      {!Array.isArray(orders) || orders.length === 0 ? (
        <EmptyState>Chưa có đơn hàng nào.</EmptyState>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <OrderHeader>
              <OrderInfo>
                <strong>Mã đơn #{order.id}</strong>
                <br />
                <span>
                  <Package size={14} style={{ marginRight: 4 }} />
                  Ngày đặt:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("vi-VN")
                    : "Không rõ"}
                </span>
              </OrderInfo>

              <OrderStatus $status={order.status || "PENDING"}>
                {order.status || "PENDING"}
              </OrderStatus>

              <OrderTotal>
                <DollarSign size={16} />
                {(order.totalPrice || 0).toLocaleString()}₫
              </OrderTotal>
            </OrderHeader>

            {/* 🔽 Chi tiết nằm ngay dưới ngày đặt */}
            <ViewButton onClick={() => handleToggleDetail(order.id)}>
              {expandedOrderId === order.id ? (
                <>
                  <ChevronUp size={14} /> Thu gọn
                </>
              ) : (
                <>
                  <ChevronDown size={14} /> Xem chi tiết
                </>
              )}
            </ViewButton>

            {expandedOrderId === order.id && orderDetails[order.id] && (
              <DetailSection>
                <Divider />
                <div
                  style={{
                    background: "#fafafa",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <p>
                    <MapPin size={14} /> <strong>Địa chỉ:</strong>{" "}
                    {orderDetails[order.id].shippingAddress || "Chưa có"}
                  </p>
                  <p>
                    <CreditCard size={14} /> <strong>Thanh toán:</strong>{" "}
                    {orderDetails[order.id].paymentMethod || "Chưa có"}
                  </p>
                </div>

                <ProductList>
                  {orderDetails[order.id].items?.map((item) => {
                    const { product, productVariant } = item;
                    if (!product || !productVariant)
                      return <p key={item.id}>Đang tải sản phẩm...</p>;

                    const unitPrice =
                      (product.price || 0) + (productVariant.extraPrice || 0);
                    const imageSrc = getImageSrc(product, productVariant);

                    return (
                      <ProductItem key={item.id}>
                        <ProductImage src={imageSrc} alt={product.name} />
                        <ProductInfo>
                          <ProductName>{product.name}</ProductName>
                          <ProductVariant>
                            {productVariant.color && (
                              <>Phân loại: {productVariant.color} </>
                            )}
                            {productVariant.size && <>| {productVariant.size}</>}
                          </ProductVariant>
                          <ProductPrice>
                            {unitPrice.toLocaleString()}₫
                          </ProductPrice>
                        </ProductInfo>
                        <Quantity>
                          <ShoppingBag size={14} /> x{item.quantity}
                        </Quantity>
                      </ProductItem>
                    );
                  })}
                </ProductList>

                <div
                  style={{
                    textAlign: "right",
                    marginTop: "16px",
                    fontSize: "17px",
                    fontWeight: "600",
                    color: "#e74c3c",
                    borderTop: "1px solid #eee",
                    paddingTop: "10px",
                  }}
                >
                  Tổng số tiền:{" "}
                  {(order.totalPrice || 0).toLocaleString("vi-VN")}₫
                </div>
              </DetailSection>
            )}
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default OrdersTab;
