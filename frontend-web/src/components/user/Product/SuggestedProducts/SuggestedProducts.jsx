import React, { useEffect, useState } from "react";
import ProductService from "../../../../services/productService";
import { SuggestedContainer, Title, ProductList, ProductCard, ProductImage, ProductName, ProductPrice } from "./style";
import { useNavigate } from "react-router-dom";

const SuggestedProducts = ({ categoryId, currentProductId }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const res = await ProductService.getAll();
        const allProducts = res?.data || res || [];

        const filtered = allProducts.filter(
          (p) => p.categoryId === categoryId && p.id !== currentProductId
        );

        setProducts(filtered.slice(0, 6));
      } catch (error) {
        console.error("❌ Lỗi tải sản phẩm đề xuất:", error);
      }
    };

    fetchSuggested();
  }, [categoryId, currentProductId]);

  return (
    <SuggestedContainer>
      <Title>Sản phẩm đề xuất</Title>
      <ProductList>
        {products.map((product) => (
          <ProductCard key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductImage src={product.thumbnailUrl?.startsWith("http") ? product.thumbnailUrl : `http://localhost:8080${product.thumbnailUrl}`} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price?.toLocaleString()}₫</ProductPrice>
          </ProductCard>
        ))}
      </ProductList>
    </SuggestedContainer>
  );
};

export default SuggestedProducts;
