import React, { useEffect, useState } from "react";
import CategoryService from "../../../../services/categoryService";
import CategoryCard from "./CategoryCard";
import { SectionTitle, CategoryGrid } from "./style";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAll();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  if (!categories.length) return <p>Đang tải danh mục...</p>;

  return (
    <div>
      <SectionTitle>Danh mục sản phẩm</SectionTitle>
      <CategoryGrid>
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </CategoryGrid>
    </div>
  );
};

export default CategoryList;
