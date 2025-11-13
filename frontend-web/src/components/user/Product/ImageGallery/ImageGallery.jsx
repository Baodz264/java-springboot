import React, { useState, useEffect } from "react";
import {
  GalleryWrapper,
  MainImageWrapper,
  MainImage,
  ThumbnailsWrapper,
  ArrowButton,
  ThumbnailList,
  ThumbnailItem,
  ThumbnailImage,
} from "./style";

import ProductService from "../../../../services/productService";
import ProductImageService from "../../../../services/productImageService";
import ProductVariantService from "../../../../services/productVariantService";

const BASE_URL = "http://localhost:8080";

const ImageGallery = ({ productId, selectedVariant }) => {
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  const maxVisibleThumbnails = 4; // số ảnh hiển thị cùng lúc

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [productData, imagesDataRaw, variantsDataRaw] = await Promise.all([
          ProductService.getById(productId),
          ProductImageService.getAll(),
          ProductVariantService.getAll(),
        ]);

        const allImages = Array.isArray(imagesDataRaw)
          ? imagesDataRaw
          : imagesDataRaw?._embedded?.productImages || [];

        const allVariants = Array.isArray(variantsDataRaw)
          ? variantsDataRaw
          : variantsDataRaw?._embedded?.productVariants || [];

        const productThumbnail = productData?.thumbnailUrl
          ? productData.thumbnailUrl.startsWith("http")
            ? productData.thumbnailUrl
            : `${BASE_URL}${productData.thumbnailUrl}`
          : null;

        const filteredImages = allImages
          .filter((img) => img.product?.id === productId || img.productId === productId)
          .map((img) =>
            img.imageUrl.startsWith("http") ? img.imageUrl : `${BASE_URL}${img.imageUrl}`
          );

        let mergedImages = Array.from(
          new Set([...(productThumbnail ? [productThumbnail] : []), ...filteredImages])
        );

        if (selectedVariant) {
          const foundVariant = allVariants.find(
            (v) =>
              (v.product?.id || v.productId) === productId &&
              v.color === selectedVariant.color &&
              v.size === selectedVariant.size
          );
          if (foundVariant?.imageUrl) {
            const variantUrl = foundVariant.imageUrl.startsWith("http")
              ? foundVariant.imageUrl
              : `${BASE_URL}${foundVariant.imageUrl}`;
            mergedImages = [variantUrl, ...mergedImages.filter((img) => img !== variantUrl)];
          }
        }

        setImages(mergedImages);
        setMainImage(mergedImages[0] || null);
        setScrollIndex(0); // reset scroll khi đổi product
      } catch (error) {
        console.error("❌ Lỗi khi tải ảnh sản phẩm:", error);
        setImages([]);
        setMainImage(null);
      }
    };

    if (productId) fetchImages();
  }, [productId, selectedVariant]);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setScrollIndex((prev) =>
      Math.min(prev + 1, images.length - maxVisibleThumbnails)
    );
  };

  if (!images.length)
    return <p style={{ padding: "20px" }}>Không có hình ảnh sản phẩm.</p>;

  return (
    <GalleryWrapper>
      <MainImageWrapper>
        <MainImage src={mainImage} alt="Ảnh sản phẩm" />
      </MainImageWrapper>

      <ThumbnailsWrapper>
        <ArrowButton onClick={handlePrev} disabled={scrollIndex === 0}>
          ◀
        </ArrowButton>

        <ThumbnailList>
          {images
            .slice(scrollIndex, scrollIndex + maxVisibleThumbnails)
            .map((img, index) => (
              <ThumbnailItem
                key={index}
                $active={mainImage === img}
                onClick={() => setMainImage(img)}
              >
                <ThumbnailImage src={img} alt={`Ảnh ${index + 1}`} />
              </ThumbnailItem>
            ))}
        </ThumbnailList>

        <ArrowButton
          onClick={handleNext}
          disabled={scrollIndex >= images.length - maxVisibleThumbnails}
        >
          ▶
        </ArrowButton>
      </ThumbnailsWrapper>
    </GalleryWrapper>
  );
};

export default ImageGallery;
