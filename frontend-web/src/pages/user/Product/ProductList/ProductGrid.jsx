import React from "react";
import { ProductGrid } from "./style";
import ProductCard from "./ProductCard";

const ProductGridView = ({ products, loading, navigate }) => {
  if (loading)
    return <p style={{ textAlign: "center" }}>Đang tải sản phẩm...</p>;
  if (products.length === 0)
    return <p style={{ textAlign: "center" }}>Không có sản phẩm phù hợp.</p>;

  return (
    <ProductGrid>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} navigate={navigate} />
      ))}
    </ProductGrid>
  );
};

export default ProductGridView;
