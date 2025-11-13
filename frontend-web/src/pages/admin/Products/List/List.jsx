import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../../../services/productService";
import BrandService from "../../../../services/brandService";
import CategoryService from "../../../../services/categoryService";
import { useToast } from "../../../../contexts/ToastProvider";
import { Container, Header, Table, Button, SearchInput, FilterRow, Select } from "./style";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Component hiển thị ảnh với fallback và xử lý URL cloud
const ImageWithFallback = ({ src, alt }) => {
  const getUrl = (url) => {
    if (!url) return "/images/default-product.png";
    return url.startsWith("http") ? url : `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const [imgSrc, setImgSrc] = useState(getUrl(src));

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 5 }}
      onError={() => setImgSrc("/images/default-product.png")}
    />
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  // Lấy danh sách thương hiệu và danh mục
  useEffect(() => {
    const fetchBrandsCategories = async () => {
      try {
        const [brandData, categoryData] = await Promise.all([BrandService.getAll(), CategoryService.getAll()]);
        setBrands(Array.isArray(brandData) ? brandData : brandData.data || []);
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh mục / thương hiệu!");
      }
    };
    fetchBrandsCategories();
  }, [toast]);

  // Lấy danh sách sản phẩm
  const fetchProducts = async (params = {}) => {
    try {
      const data = await ProductService.search(params);
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải danh sách sản phẩm!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async () => {
    await fetchProducts({ keyword, minPrice, maxPrice, categoryId, brandId });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    try {
      await ProductService.delete(id);
      toast.success("Đã xóa sản phẩm!");
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại!");
    }
  };

  const getBrandName = (id) => brands.find(b => b.id === id)?.name || "-";
  const getCategoryName = (id) => categories.find(c => c.id === id)?.name || "-";
  const truncate = (text, max = 50) => text?.length > max ? text.substring(0, max) + "..." : text || "-";

  return (
    <Container>
      <Header>
        <h2>Danh sách sản phẩm</h2>
        <Button onClick={() => navigate("/admin/products/add")}>+ Thêm sản phẩm</Button>
      </Header>

      <FilterRow>
        <SearchInput placeholder="Tên hoặc SKU..." value={keyword} onChange={e => setKeyword(e.target.value)} />
        <SearchInput placeholder="Giá min" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} style={{ width: 120 }} />
        <SearchInput placeholder="Giá max" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} style={{ width: 120 }} />
        <Select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Select value={brandId} onChange={e => setBrandId(e.target.value)}>
          <option value="">Tất cả thương hiệu</option>
          {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </Select>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
      </FilterRow>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>SKU</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Danh mục</th>
            <th>Thương hiệu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><ImageWithFallback src={p.thumbnailUrl} alt={p.name} /></td>
              <td>{p.sku}</td>
              <td>{p.name}</td>
              <td>{truncate(p.description)}</td>
              <td>{p.price?.toLocaleString("vi-VN")} đ</td>
              <td>{p.stock}</td>
              <td>{getCategoryName(p.categoryId)}</td>
              <td>{getBrandName(p.brandId)}</td>
              <td>
                <Button onClick={() => navigate(`/admin/products/view/${p.id}`)}>Xem</Button>
                <Button $warn onClick={() => navigate(`/admin/products/edit/${p.id}`)}>Sửa</Button>
                <Button $danger onClick={() => handleDelete(p.id)}>Xóa</Button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="10" style={{ textAlign: "center", padding: 20 }}>Không tìm thấy sản phẩm nào</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
