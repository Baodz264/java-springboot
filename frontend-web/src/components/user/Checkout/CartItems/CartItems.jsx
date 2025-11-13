import React from "react";
import {
  ProductList,
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  QuantityContainer,
  QuantityButton,
  Quantity,
  RemoveButton,
} from "./style";

const BASE_URL = "http://localhost:8080";

export default function CartItems({ cartItems, onQuantityChange, onRemove, onSelect }) {
  return (
    <ProductList>
      {cartItems.map((item) => {
        const { product, productVariant } = item;

        if (!product || !productVariant)
          return (
            <ProductItem key={item.id}>
              <p>Đang tải sản phẩm...</p>
            </ProductItem>
          );

        const unitPrice = (product.price || 0) + (productVariant.extraPrice || 0);
        const totalPrice = unitPrice * (item.quantity || 0);

        const imageSrc = productVariant.imageUrl
          ? productVariant.imageUrl.startsWith("http")
            ? productVariant.imageUrl
            : `${BASE_URL}${productVariant.imageUrl.startsWith("/") ? "" : "/"}${productVariant.imageUrl}`
          : product.thumbnailUrl
          ? product.thumbnailUrl.startsWith("http")
            ? product.thumbnailUrl
            : `${BASE_URL}${product.thumbnailUrl.startsWith("/") ? "" : "/"}${product.thumbnailUrl}`
          : "/placeholder.png";

        return (
          <ProductItem key={item.id}>
            <input
              type="checkbox"
              checked={item.selected || false}
              onChange={(e) => onSelect(item.id, e.target.checked)}
              style={{ marginRight: "10px" }}
            />

            <ProductImage src={imageSrc} alt={product.name || "Sản phẩm"} />

            <ProductInfo>
              <ProductName>{product.name || "Không có tên"}</ProductName>
              <ProductPrice>{totalPrice.toLocaleString()}₫</ProductPrice>
              {(productVariant.size || productVariant.color) && (
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {productVariant.size && `Size: ${productVariant.size}`}{" "}
                  {productVariant.color && `| Màu: ${productVariant.color}`}
                </p>
              )}
            </ProductInfo>

            <QuantityContainer>
              <QuantityButton onClick={() => onQuantityChange(item.id, -1)}>-</QuantityButton>
              <Quantity type="number" value={item.quantity || 0} readOnly />
              <QuantityButton onClick={() => onQuantityChange(item.id, +1)}>+</QuantityButton>
            </QuantityContainer>

            <RemoveButton onClick={() => onRemove(item.id)} />
          </ProductItem>
        );
      })}
    </ProductList>
  );
}
