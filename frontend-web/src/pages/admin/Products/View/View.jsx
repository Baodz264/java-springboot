import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../../../services/productService";
import BrandService from "../../../../services/brandService";
import CategoryService from "../../../../services/categoryService";
import ProductImageService from "../../../../services/productImageService";
import ProductVariantService from "../../../../services/productVariantService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Title, InfoWrapper, Thumbnail, InfoTable, SubTitle, TableWrapper } from "./style";
import ImageTable from "./Images/ImageTable";
import VariantTable from "./Variants/VariantTable";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const ProductView = () => {
  const { id } = useParams();
  const toast = useToast();

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBrandsCategories = async () => {
      try {
        const [brandData, categoryData] = await Promise.all([BrandService.getAll(), CategoryService.getAll()]);
        setBrands(Array.isArray(brandData) ? brandData : brandData.data || []);
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.data || []);
      } catch {
        toast.error("Lấy danh sách Thương hiệu/Danh mục thất bại");
      }
    };
    fetchBrandsCategories();
  }, [toast]);

  const fetchProductData = useCallback(async () => {
    try {
      const data = await ProductService.getById(id);
      setProduct(data);
    } catch {
      toast.error("Lấy thông tin sản phẩm thất bại");
    }
  }, [id, toast]);

  const fetchImages = useCallback(async () => {
    try {
      const allImages = await ProductImageService.getAll();
      const productImages = (Array.isArray(allImages) ? allImages : allImages.data || []).filter(img => parseInt(img.productId) === parseInt(id));
      const withUrl = productImages.map(img => ({
        ...img,
        imageUrl: img.imageUrl?.startsWith("http") ? img.imageUrl : `${API_BASE_URL}${img.imageUrl.startsWith("/") ? "" : "/"}${img.imageUrl}` || "/images/default-product.png"
      }));
      setImages(withUrl);
    } catch {
      toast.error("Lấy ảnh phụ thất bại");
    }
  }, [id, toast]);

  const fetchVariants = useCallback(async () => {
    try {
      const allVariants = await ProductVariantService.getAll();
      const productVariants = (Array.isArray(allVariants) ? allVariants : allVariants.data || []).filter(v => parseInt(v.productId) === parseInt(id));
      const withUrl = productVariants.map(v => ({
        ...v,
        imageUrl: v.imageUrl?.startsWith("http") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl.startsWith("/") ? "" : "/"}${v.imageUrl}` || "/images/default-product.png"
      }));
      setVariants(withUrl);
    } catch {
      toast.error("Lấy biến thể thất bại");
    }
  }, [id, toast]);

  const refreshProductData = useCallback(async () => {
    await fetchProductData();
    await fetchImages();
    await fetchVariants();
  }, [fetchProductData, fetchImages, fetchVariants]);

  useEffect(() => {
    refreshProductData();
  }, [refreshProductData]);

  const getBrandName = (brandId) => brands.find(b => b.id === brandId)?.name || "-";
  const getCategoryName = (categoryId) => categories.find(c => c.id === categoryId)?.name || "-";

  return (
    <Container>
      <Title>Chi tiết sản phẩm</Title>
      <InfoWrapper>
        <Thumbnail
          src={product.thumbnailUrl?.startsWith("http") ? product.thumbnailUrl : `${API_BASE_URL}${product.thumbnailUrl || ""}`}
          alt={product.name}
          onError={(e) => e.target.src = "/images/default-product.png"}
        />
        <InfoTable>
          <tbody>
            <tr><th>Mã SP</th><td>{product.sku}</td></tr>
            <tr><th>Tên sản phẩm</th><td>{product.name}</td></tr>
            <tr><th>Giá</th><td style={{ color: "#e74c3c", fontWeight: "bold" }}>{product.price?.toLocaleString("vi-VN")} đ</td></tr>
            <tr><th>Tồn kho</th><td style={{ color: product.stock > 0 ? "#27ae60" : "#c0392b" }}>{product.stock}</td></tr>
            <tr><th>Danh mục</th><td>{getCategoryName(product.categoryId)}</td></tr>
            <tr><th>Thương hiệu</th><td>{getBrandName(product.brandId)}</td></tr>
            <tr><th>Mô tả</th><td>{product.description || "-"}</td></tr>
          </tbody>
        </InfoTable>
      </InfoWrapper>

      <SubTitle>Ảnh phụ</SubTitle>
      <TableWrapper>
        <ImageTable images={images} productId={parseInt(id)} refresh={refreshProductData} />
      </TableWrapper>

      <SubTitle>Biến thể</SubTitle>
      <TableWrapper>
        <VariantTable variants={variants} productId={parseInt(id)} refresh={refreshProductData} />
      </TableWrapper>
    </Container>
  );
};

export default ProductView;
