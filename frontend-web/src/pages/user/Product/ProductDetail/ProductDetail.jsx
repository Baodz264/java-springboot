import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// 🧩 Component con
import ImageGallery from "../../../../components/user/Product/ImageGallery/ImageGallery";
import PriceInfo from "../../../../components/user/Product/PriceInfo/PriceInfo";
import VariantSelector from "../../../../components/user/Product/VariantSelector/VariantSelector";
import QuantitySelector from "../../../../components/user/Product/QuantitySelector/QuantitySelector";
import ActionButtons from "../../../../components/user/Product/ActionButtons/ActionButtons";
import ReviewList from "../../../../components/user/Product/ReviewList/ReviewList";
import ReviewForm from "../../../../components/user/Product/ReviewForm/ReviewForm";
import SuggestedProducts from "../../../../components/user/Product/SuggestedProducts/SuggestedProducts";

// 🧭 Service
import ProductService from "../../../../services/productService";
import ProductVariantService from "../../../../services/productVariantService";
import ReviewService from "../../../../services/reviewService";
import BrandService from "../../../../services/brandService";

// 🧱 Styled
import {
  Container,
  ProductSection,
  LeftPanel,
  RightPanel,
  ProductTitle,
  Description,
  ReviewSection,
  SectionTitle,
  Brand,
  Divider,
  ReviewFormWrapper,
  ReviewListWrapper,
} from "./style";

// 🧠 UserContext
import { UserContext } from "../../../../contexts/UserContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [variants, setVariants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Cuộn lên đầu trang mỗi khi load sản phẩm mới
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Lấy dữ liệu sản phẩm + biến thể + review
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, variantRes, reviewRes] = await Promise.all([
          ProductService.getById(id),
          ProductVariantService.getAll(),
          ReviewService.getAll(),
        ]);

        const productData = productRes.data || productRes;
        setProduct(productData);

        // Lấy brand
        if (productData.brandId) {
          try {
            const brandData = await BrandService.getById(productData.brandId);
            setBrand(brandData);
          } catch (err) {
            console.warn("Không lấy được brand:", err);
          }
        }

        // Lọc biến thể
        const allVariants = Array.isArray(variantRes) ? variantRes : variantRes.data || [];
        const filteredVariants = allVariants.filter(
          (v) => v.product?.id === Number(id) || v.productId === Number(id)
        );
        setVariants(filteredVariants);
        if (filteredVariants.length > 0) setSelectedVariant(filteredVariants[0]);

        // Lọc review
        const allReviews = Array.isArray(reviewRes) ? reviewRes : reviewRes.data || [];
        const filteredReviews = allReviews.filter(
          (r) => r.product?.id === Number(id) || r.productId === Number(id)
        );
        setReviews(filteredReviews);
      } catch (error) {
        console.error("❌ Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!product) return <p style={{ padding: "40px" }}>Đang tải thông tin sản phẩm...</p>;

  // Giá cuối cùng theo biến thể
  const finalPrice =
    selectedVariant?.extraPrice != null
      ? product.price + selectedVariant.extraPrice
      : product.price;

  // Reload review sau khi gửi thành công
  const reloadReviews = async () => {
    try {
      const res = await ReviewService.getAll();
      const allReviews = Array.isArray(res) ? res : res.data || [];
      const filtered = allReviews.filter(
        (r) => r.product?.id === Number(id) || r.productId === Number(id)
      );
      setReviews(filtered);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("❌ Lỗi reload review:", error);
    }
  };

  return (
    <Container>
      {/* Thông tin sản phẩm */}
      <ProductSection>
        <LeftPanel>
          <ImageGallery productId={product.id} selectedVariant={selectedVariant} />
        </LeftPanel>

        <RightPanel>
          <ProductTitle>{product.name}</ProductTitle>

          <Brand>
            Thương hiệu:{" "}
            {brand?.name || product.brandName || product.brand?.name || "Đang cập nhật"}
          </Brand>

          {brand?.logoUrl && (
            <img
              src={brand.logoUrl.startsWith("http") ? brand.logoUrl : `http://localhost:8080${brand.logoUrl}`}
              alt={brand?.name}
              style={{ width: 100, height: "auto", marginTop: 10 }}
            />
          )}

          <PriceInfo price={finalPrice} quantity={quantity} />

          <Divider />

          {variants.length > 0 && (
            <VariantSelector productId={product.id} onSelectVariant={setSelectedVariant} />
          )}

          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          <ActionButtons productId={product.id} quantity={quantity} variant={selectedVariant} />

          <Divider />

          <Description>{product.description}</Description>
        </RightPanel>
      </ProductSection>

      {/* Review */}
      <ReviewSection>
        <ReviewFormWrapper>
          <SectionTitle>Viết đánh giá</SectionTitle>
          {user ? (
            <ReviewForm productId={product.id} onSuccess={reloadReviews} />
          ) : (
            <p style={{ color: "gray", fontStyle: "italic" }}>🔒 Vui lòng đăng nhập để gửi đánh giá.</p>
          )}
        </ReviewFormWrapper>

        <ReviewListWrapper>
          <SectionTitle>Đánh giá sản phẩm</SectionTitle>
          <ReviewList productId={product.id} reviews={reviews} />
        </ReviewListWrapper>
      </ReviewSection>

      {/* Sản phẩm gợi ý */}
      <SuggestedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </Container>
  );
};

export default ProductDetail;
