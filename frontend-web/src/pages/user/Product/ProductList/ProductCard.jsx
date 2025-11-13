import React from "react";
import {
  Card,
  ImageWrapper,
  Image,
  Info,
  Name,
  PriceBox,
  Price,       // <-- dùng Price mới
  ButtonGroup,
  Button,
} from "./style";

const ProductCard = ({ product, navigate }) => {
  const { id, name, price, imageUrl } = product;

  return (
    <Card>
      <ImageWrapper>
        <Image src={imageUrl} alt={name} />
      </ImageWrapper>
      <Info>
        <Name>{name}</Name>
        <PriceBox>
          <Price>{price.toLocaleString("vi-VN")}₫</Price>
        </PriceBox>
      </Info>
      <ButtonGroup>
        <Button onClick={() => navigate(`/product/${id}`)}>Chi tiết</Button>
        <Button $primary>Mua ngay</Button>
      </ButtonGroup>
    </Card>
  );
};

export default ProductCard;
