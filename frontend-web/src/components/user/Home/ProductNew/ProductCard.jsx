// src/pages/home/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardWrapper,
  ImageWrapper,
  Image,
  Info,
  Name,
  PriceBox,
  Price,
  ButtonGroup,
  Button,
} from "./style";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8080";

  // Ưu tiên ảnh đầu tiên trong danh sách images, nếu không thì thumbnail
  const imageUrl =
    product.images?.length > 0
      ? product.images[0].imageUrl.startsWith("http")
        ? product.images[0].imageUrl
        : `${baseUrl}${product.images[0].imageUrl}`
      : product.thumbnailUrl
      ? product.thumbnailUrl.startsWith("http")
        ? product.thumbnailUrl
        : `${baseUrl}${product.thumbnailUrl}`
      : "/images/default-product.png";

  return (
    <CardWrapper>
      <ImageWrapper>
        <Image src={imageUrl} alt={product.name} />
      </ImageWrapper>

      <Info>
        <Name title={product.name}>{product.name}</Name>
        <PriceBox>
          <Price>{product.price.toLocaleString("vi-VN")}₫</Price>
        </PriceBox>
      </Info>

      <ButtonGroup>
        <Button onClick={() => navigate(`/product/${product.id}`)}>Chi tiết</Button>
        <Button $primary onClick={() => console.log("Mua ngay:", product.id)}>Mua ngay</Button>
      </ButtonGroup>
    </CardWrapper>
  );
};

export default ProductCard;
