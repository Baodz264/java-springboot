import React from "react";
import {
  ProductItem,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  QuantityContainer,
  QuantityButton,
  Quantity,
  RemoveButton,
} from "../style";

const BASE_URL = "http://localhost:8080";

const CartItem = ({ item, onQuantityChange, onRemove, onSelect }) => {
  const { product, productVariant } = item;

  if (!product) return <p>Đang tải sản phẩm...</p>;

  const unitPrice = (product.price || 0) + (productVariant?.extraPrice || 0);
  const totalPrice = unitPrice * (item.quantity || 0);

  const getImageSrc = () => {
    const variantUrl = productVariant?.imageUrl;
    const mainUrl = product?.thumbnailUrl;

    const cleanVariant = variantUrl && variantUrl.trim() !== "" ? variantUrl.trim() : null;
    const cleanMain = mainUrl && mainUrl.trim() !== "" ? mainUrl.trim() : null;

    const finalUrl = cleanVariant ?? cleanMain ?? "/placeholder.png";

    return finalUrl.startsWith("http")
      ? finalUrl
      : `${BASE_URL}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`;
  };

  return (
    <ProductItem>
      <input
        type="checkbox"
        checked={item.selected || false}
        onChange={(e) => onSelect(item.id, e.target.checked)}
        style={{ marginRight: "10px" }}
      />

      <ProductImage src={getImageSrc()} alt={product.name || "Sản phẩm"} />

      <ProductInfo>
        <ProductName>{product.name || "Không có tên"}</ProductName>
        <ProductPrice>{totalPrice.toLocaleString()}₫</ProductPrice>
        {(productVariant?.size || productVariant?.color) && (
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            {productVariant?.size && `Size: ${productVariant.size}`}{" "}
            {productVariant?.color && `| Màu: ${productVariant.color}`}
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
};

export default CartItem;
