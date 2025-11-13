import React, { useEffect, useState } from "react";
import {
  VariantContainer,
  SectionHeader,
  VariantGroup,
  VariantLabel,
  VariantOptions,
  VariantOption,
  VariantImage,
  VariantText,
} from "./style";
import ProductVariantService from "../../../../services/productVariantService";

const BASE_URL = "http://localhost:8080";

const VariantSelector = ({ productId, onSelectVariant }) => {
  const [variants, setVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const allVariants = await ProductVariantService.getAll();
        const filtered = allVariants.filter(
          (v) =>
            v.productId === Number(productId) ||
            v.product?.id === Number(productId)
        );
        setVariants(filtered);
      } catch (error) {
        console.error("❌ Lỗi khi tải biến thể:", error);
      }
    };
    if (productId) fetchVariants();
  }, [productId]);

  const colorOptions = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const sizeOptions = [...new Set(variants.map((v) => v.size).filter(Boolean))];

  const isColorDisabled = (color) => {
    if (!selectedSize) return false;
    return !variants.some((v) => v.color === color && v.size === selectedSize);
  };

  const isSizeDisabled = (size) => {
    if (!selectedColor) return false;
    return !variants.some((v) => v.size === size && v.color === selectedColor);
  };

  const handleSelect = (type, value) => {
    if (type === "color") {
      const newColor = selectedColor === value ? null : value;
      const validSizes = variants
        .filter((v) => v.color === newColor)
        .map((v) => v.size);
      const newSize = validSizes.includes(selectedSize) ? selectedSize : null;
      setSelectedColor(newColor);
      setSelectedSize(newSize);
      const variant = variants.find(
        (v) => v.color === newColor && (!newSize || v.size === newSize)
      );
      if (variant && onSelectVariant) onSelectVariant(variant);
    }

    if (type === "size") {
      const newSize = selectedSize === value ? null : value;
      const validColors = variants
        .filter((v) => v.size === newSize)
        .map((v) => v.color);
      const newColor = validColors.includes(selectedColor) ? selectedColor : null;
      setSelectedColor(newColor);
      setSelectedSize(newSize);
      const variant = variants.find(
        (v) => (!newColor || v.color === newColor) && v.size === newSize
      );
      if (variant && onSelectVariant) onSelectVariant(variant);
    }
  };

  const getVariantImage = (color) => {
    const variant = variants.find((v) => v.color === color);
    if (!variant || !variant.imageUrl) return null;
    return variant.imageUrl.startsWith("http")
      ? variant.imageUrl
      : `${BASE_URL}${variant.imageUrl}`;
  };

  return (
    <VariantContainer>
      <SectionHeader>Phân loại sản phẩm</SectionHeader>

      {colorOptions.length > 0 && (
        <VariantGroup>
          <VariantLabel>Màu sắc:</VariantLabel>
          <VariantOptions>
            {colorOptions.map((color) => {
              const disabled = isColorDisabled(color);
              const imageUrl = getVariantImage(color);
              return (
                <VariantOption
                  key={color}
                  $active={selectedColor === color}
                  $disabled={disabled}
                  onClick={() => !disabled && handleSelect("color", color)}
                >
                  {imageUrl && <VariantImage src={imageUrl} alt={color} />}
                  <VariantText>{color}</VariantText>
                </VariantOption>
              );
            })}
          </VariantOptions>
        </VariantGroup>
      )}

      {sizeOptions.length > 0 && (
        <VariantGroup>
          <VariantLabel>Kích thước:</VariantLabel>
          <VariantOptions>
            {sizeOptions.map((size) => {
              const disabled = isSizeDisabled(size);
              return (
                <VariantOption
                  key={size}
                  $active={selectedSize === size}
                  $disabled={disabled}
                  onClick={() => !disabled && handleSelect("size", size)}
                >
                  <VariantText>{size}</VariantText>
                </VariantOption>
              );
            })}
          </VariantOptions>
        </VariantGroup>
      )}
    </VariantContainer>
  );
};

export default VariantSelector;
