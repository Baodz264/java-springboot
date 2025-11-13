import React from "react";
import { Table } from "./style";

const OrderTable = ({ order }) => {
  if (!order) return <p>Không có dữ liệu đơn hàng.</p>;

  // Hàm định dạng tiền
  const formatCurrency = (value) =>
    value ? value.toLocaleString("vi-VN") + "₫" : "0₫";

  return (
    <Table>
      <thead>
        <tr>
          <th>Trường</th>
          <th>Giá trị</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mã đơn hàng</td>
          <td>{order.id}</td>
        </tr>
        <tr>
          <td>Người đặt</td>
          <td>{order.user?.name || "Không xác định"}</td>
        </tr>
        <tr>
          <td>Tổng giá</td>
          <td>{formatCurrency(order.totalPrice)}</td>
        </tr>
        <tr>
          <td>Trạng thái</td>
          <td>
            <span
              style={{
                color:
                  order.status === "COMPLETED"
                    ? "green"
                    : order.status === "CANCELLED"
                    ? "red"
                    : "#555",
                fontWeight: "bold",
              }}
            >
              {order.status}
            </span>
          </td>
        </tr>
        <tr>
          <td>Phương thức thanh toán</td>
          <td>{order.paymentMethod}</td>
        </tr>
        <tr>
          <td>Địa chỉ giao hàng</td>
          <td>{order.shippingAddress || "Chưa có địa chỉ"}</td>
        </tr>
        <tr>
          <td>Mã giảm giá</td>
          <td>{order.voucherCode || "-"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default OrderTable;
