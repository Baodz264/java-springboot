import React from "react";
import { CategoryCardWrapper, CategoryImage, CategoryName } from "./style";

const CategoryCard = ({ category }) => {
  // fallback ảnh nếu category.imageUrl null hoặc rỗng
  const imageSrc =
    category.imageUrl?.startsWith("http")
      ? category.imageUrl
      : `http://localhost:8080${category.imageUrl}`; // nếu dùng server local

  return (
    <CategoryCardWrapper>
      <CategoryImage
        src={imageSrc || "https://via.placeholder.com/150"}
        alt={category.name || "Category"}
      />
      <CategoryName>{category.name || "Không tên"}</CategoryName>
    </CategoryCardWrapper>
  );
};

export default CategoryCard;
