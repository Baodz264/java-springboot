import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Header,
  FilterSection,
  FilterTitle,
  FilterInput,
  FilterSelect,
  FilterButton,
  RatingOptions,
  RatingStar,
} from "./style";

import BrandService from "../../../../services/brandService";
import CategoryService from "../../../../services/categoryService";

const FilterSidebar = ({ filters, onChange, onApply }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandData, categoryData] = await Promise.all([
          BrandService.getAll(),
          CategoryService.getAll(),
        ]);

        setBrands(brandData || []);
        setCategories(categoryData || []);
        setRatings([5, 4, 3, 2, 1]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bộ lọc:", error);
      }
    };

    fetchData();
  }, []);

  // 🟢 Hàm xử lý click rating (bật/tắt)
  const handleRatingClick = (star) => {
    if (filters.rating === String(star)) {
      // 👉 Nếu đã chọn rồi thì bỏ chọn
      onChange({ target: { name: "rating", value: "" } });
    } else {
      // 👉 Nếu chưa chọn thì chọn
      onChange({ target: { name: "rating", value: String(star) } });
    }
  };

  return (
    <Sidebar>
      <Header>Bộ lọc tìm kiếm</Header>

      {/* Giá */}
      <FilterSection>
        <FilterTitle>Khoảng giá</FilterTitle>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterInput
            type="number"
            name="priceMin"
            placeholder="Từ"
            value={filters.priceMin}
            onChange={onChange}
          />
          <FilterInput
            type="number"
            name="priceMax"
            placeholder="Đến"
            value={filters.priceMax}
            onChange={onChange}
          />
        </div>
      </FilterSection>

      {/* Đánh giá */}
      <FilterSection>
        <FilterTitle>Đánh giá</FilterTitle>
        <RatingOptions>
          {ratings.map((star) => (
            <label
              key={star}
              onClick={() => handleRatingClick(star)}
              style={{ cursor: "pointer" }}
            >
              <input
                type="radio"
                name="rating"
                value={star}
                checked={filters.rating === String(star)}
                readOnly
              />
              <RatingStar>
                {"★".repeat(star)}
                {"☆".repeat(5 - star)}
              </RatingStar>
              {star === 5 ? "" : " trở lên"}
            </label>
          ))}
        </RatingOptions>
      </FilterSection>

      {/* Danh mục */}
      <FilterSection>
        <FilterTitle>Danh mục</FilterTitle>
        <FilterSelect
          name="category"
          value={filters.category}
          onChange={onChange}
        >
          <option value="">Tất cả</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      {/* Thương hiệu */}
      <FilterSection>
        <FilterTitle>Thương hiệu</FilterTitle>
        <FilterSelect name="brand" value={filters.brand} onChange={onChange}>
          <option value="">Tất cả</option>
          {brands.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </FilterSelect>
      </FilterSection>

      <FilterButton onClick={onApply}>Áp dụng bộ lọc</FilterButton>
    </Sidebar>
  );
};

export default FilterSidebar;
