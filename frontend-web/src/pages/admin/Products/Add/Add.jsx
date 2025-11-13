import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  ImagePreview
} from "./style";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const Add = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    description: "",
    categoryId: "",
    brandId: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandData = await BrandService.getAll();
        const categoryData = await CategoryService.getAll();
        setBrands(Array.isArray(brandData) ? brandData : brandData.data || []);
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Lấy danh sách thương hiệu/danh mục thất bại!");
      }
    };
    fetchData();
  }, [toast]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.name || !product.sku || !product.price || !product.stock) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    try {
      await ProductService.create(product, imageFile);
      toast.success("Tạo sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Tạo sản phẩm thất bại!");
    }
  };

  return (
    <Container>
      <Title>Thêm sản phẩm</Title>
      <Form onSubmit={handleSubmit}>
        <Input name="sku" placeholder="SKU" value={product.sku} onChange={handleChange} />
        <Input name="name" placeholder="Tên sản phẩm" value={product.name} onChange={handleChange} />
        <Input name="price" type="number" placeholder="Giá" value={product.price} onChange={handleChange} />
        <Input name="stock" type="number" placeholder="Số lượng" value={product.stock} onChange={handleChange} />
        <Textarea name="description" placeholder="Mô tả" value={product.description} onChange={handleChange} />

        <Select name="categoryId" value={product.categoryId} onChange={handleChange}>
          <option value="">-- Chọn Category --</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>

        <Select name="brandId" value={product.brandId} onChange={handleChange}>
          <option value="">-- Chọn Brand --</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>

        <FileInput type="file" accept="image/*" onChange={handleFileChange} />
        {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
        <SubmitButton type="submit">Thêm</SubmitButton>
      </Form>
    </Container>
  );
};

export default Add;
