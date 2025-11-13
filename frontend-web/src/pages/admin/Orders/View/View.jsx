import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../../../services/orderService";
import UserService from "../../../../services/userService";
import { Table, Container, Button, Badge } from "./style";
import OrderItemTable from "./orderI/OrderItemTable";
import { searchOrderItems } from "../../../../services/orderItemService";
import ProductService from "../../../../services/productService";
import ProductVariantService from "../../../../services/productVariantService";

const OrderView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [userName, setUserName] = useState("N/A");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // 1️⃣ Lấy thông tin đơn hàng
        const resOrder = await OrderService.getById(id);
        const orderData = resOrder?.data || resOrder || {};

        // 2️⃣ Lấy tên user từ userId
        if (orderData.userId) {
          try {
            const resUser = await UserService.getById(orderData.userId);
            const user = resUser?.data || resUser || {};
            setUserName(user.fullName || "N/A");
          } catch (err) {
            console.error("Lỗi khi lấy user:", err);
            setUserName("N/A");
          }
        }

        // 3️⃣ Lấy order items
        const resItems = await searchOrderItems({ orderId: id });
        const itemsData = Array.isArray(resItems?.data)
          ? resItems.data
          : Array.isArray(resItems)
          ? resItems
          : [];

        // 4️⃣ Load product + variant cho từng item
        const itemsWithDetail = await Promise.all(
          itemsData.map(async (item) => {
            try {
              const variantRes = await ProductVariantService.getById(
                item.productVariantId
              );
              const variant = variantRes?.data || variantRes || {};
              const productRes = await ProductService.getById(variant.productId);
              const product = productRes?.data || productRes || {};
              return { ...item, productVariant: variant, product };
            } catch (err) {
              console.error("Lỗi khi load sản phẩm:", err);
              return { ...item, productVariant: null, product: null };
            }
          })
        );

        // 5️⃣ Cập nhật state order
        setOrder({ ...orderData, items: itemsWithDetail });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>⏳ Loading...</p>;

  const formatCurrency = (value) =>
    value ? value.toLocaleString("vi-VN") + "₫" : "0₫";

  return (
    <Container>
      <h2>Chi tiết đơn hàng</h2>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Tổng giá</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{userName}</td>
            <td>{formatCurrency(order.totalPrice)}</td>
            <td>
              <Badge $status={order.status}>{order.status}</Badge>
            </td>
            <td>{order.paymentMethod}</td>
            <td>{order.shippingAddress}</td>
          </tr>
        </tbody>
      </Table>

      <h3>Sản phẩm trong đơn hàng</h3>
      <OrderItemTable items={order.items} />

      <Button onClick={() => navigate("/admin/orders")}>Quay lại</Button>
    </Container>
  );
};

export default OrderView;
