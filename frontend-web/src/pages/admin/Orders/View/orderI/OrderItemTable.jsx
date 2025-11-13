import React from "react";
import { Table } from "./style";

const BASE_URL = "http://localhost:8080";

const OrderItemTable = ({ items = [] }) => {
  if (!items.length) return <p>Không có sản phẩm trong đơn hàng.</p>;

  const formatCurrency = (value) =>
    value ? value.toLocaleString("vi-VN") + "₫" : "0₫";

  const getImageSrc = (product, variant) => {
    const url = variant?.imageUrl?.trim() || product?.thumbnailUrl?.trim() || "/placeholder.png";
    return url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Ảnh</th>
          <th>Sản phẩm</th>
          <th>Biến thể</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const product = item.productVariant?.product || item.product;
          const variant = item.productVariant;

          const imageSrc = getImageSrc(product, variant);
          const unitPrice = (product?.price || 0) + (variant?.extraPrice || 0);
          const totalPrice = unitPrice * (item.quantity || 0);

          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img
                  src={imageSrc}
                  alt={product?.name || "Sản phẩm"}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td>{product?.name || "Không xác định"}</td>
              <td>
                {variant?.color || "-"} / {variant?.size || "-"}
              </td>
              <td>{formatCurrency(unitPrice)}</td>
              <td>{item.quantity}</td>
              <td>{formatCurrency(totalPrice)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default OrderItemTable;
