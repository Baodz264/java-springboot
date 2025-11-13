import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../services/productService";
import {
  Wrapper,
  Title,
  Grid,
  Card,
  ImageWrapper,
  Image,
  Info,
  Name,
  PriceBox,
  SalePrice,
  OriginalPrice,
  Badge,
  ButtonGroup,
  Button,
} from "./style";

const ProductSale = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const products = await ProductService.getAll();
        const baseUrl = "http://localhost:8080";

        const list = products.map((p) => {
          const discount = Math.floor(Math.random() * 31) + 10;
          const salePrice = p.price - (p.price * discount) / 100;
          const imageUrl = p.thumbnailUrl
            ? p.thumbnailUrl.startsWith("http")
              ? p.thumbnailUrl
              : `${baseUrl}${p.thumbnailUrl}`
            : "/images/default-product.png";

          return { ...p, discount, salePrice, imageUrl };
        });

        setSaleProducts(list.slice(0, 12));
      } catch (err) {
        console.error("Lỗi khi tải sản phẩm:", err);
      }
    };

    fetchSaleProducts();
  }, []);

  return (
    <Wrapper>
      <Title>Sản phẩm đang giảm giá</Title>
      <Grid>
        {saleProducts.map((product) => (
          <Card key={product.id}>
            {product.discount && <Badge>-{product.discount}%</Badge>}
            <ImageWrapper>
              <Image src={product.imageUrl} alt={product.name} />
            </ImageWrapper>
            <Info>
              <Name>{product.name}</Name>
              <PriceBox>
                <SalePrice>{product.salePrice.toLocaleString("vi-VN")}₫</SalePrice>
                <OriginalPrice>{product.price.toLocaleString("vi-VN")}₫</OriginalPrice>
              </PriceBox>
            </Info>
            <ButtonGroup>
              <Button onClick={() => navigate(`/product/${product.id}`)}>Chi tiết</Button>
              <Button $primary>Mua ngay</Button>
            </ButtonGroup>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductSale;
