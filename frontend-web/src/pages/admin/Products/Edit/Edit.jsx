import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../../../services/productService";
import BrandService from "../../../../services/brandService";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";
import {
  Container,
  Title,
  Form,
  Input,
  Textarea,
  Select,
  FileInput,
  SubmitButton,
} from "./style";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);
        setImagePreview(data.thumbnailUrl ? `${API_BASE_URL}${data.thumbnailUrl}` : null);

        const brandData = await BrandService.getAll();
        const categoryData = await CategoryService.getAll();
        setBrands(Array.isArray(brandData) ? brandData : brandData.data || []);
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Lấy dữ liệu sản phẩm thất bại!");
      }
    };
    fetchData();
  }, [id, toast]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(product.thumbnailUrl ? `${API_BASE_URL}${product.thumbnailUrl}` : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.update(id, product, imageFile);
      toast.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật sản phẩm thất bại!");
    }
  };

  return (
    <Container>
      <Title>Sửa sản phẩm</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="sku" placeholder="SKU" value={product.sku || ""} onChange={handleChange} />
        <Input name="name" placeholder="Tên sản phẩm" value={product.name || ""} onChange={handleChange} />
        <Input name="price" type="number" placeholder="Giá" value={product.price || 0} onChange={handleChange} />
        <Input name="stock" type="number" placeholder="Số lượng" value={product.stock || 0} onChange={handleChange} />
        <Textarea name="description" placeholder="Mô tả" value={product.description || ""} onChange={handleChange} />

        <Select name="categoryId" value={product.categoryId || ""} onChange={handleChange}>
          <option value="">-- Chọn Category --</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>

        <Select name="brandId" value={product.brandId || ""} onChange={handleChange}>
          <option value="">-- Chọn Brand --</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>

        <FileInput type="file" accept="image/*" onChange={handleFileChange} />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            style={{ width: 100, height: 100, objectFit: "cover", marginTop: 10, borderRadius: 5 }}
          />
        )}

        <SubmitButton type="submit">Cập nhật</SubmitButton>
      </Form>
    </Container>
  );
};

export default Edit;
