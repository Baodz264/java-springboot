import React, { useEffect, useState } from "react";
import ReviewService from "../../../../services/reviewService";
import ProductService from "../../../../services/productService";
import UserService from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { Container, Header, Form, Label, Input, TextArea, Button, Select } from "./style";
import { toast } from "react-toastify";

const ReviewAdd = () => {
  const [form, setForm] = useState({ rating: "", comment: "", productId: "", userId: "" });
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prods, usrs] = await Promise.all([
          ProductService.getAll(),
          UserService.getAll()
        ]);
        setProducts(prods);
        setUsers(usrs);
      } catch (error) {
        toast.error("Không thể tải sản phẩm hoặc người dùng!");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReviewService.create(form, imageFile);
      toast.success("Thêm review thành công!");
      navigate("/admin/reviews");
    } catch (error) {
      toast.error("Lỗi khi thêm review!");
    }
  };

  return (
    <Container>
      <Header><h2>Thêm Review</h2></Header>
      <Form onSubmit={handleSubmit}>
        <Label>Đánh giá (Rating)</Label>
        <Select name="rating" value={form.rating} onChange={handleChange} required>
          <option value="">-- Chọn mức đánh giá --</option>
          <option value="1">1 ⭐ Rất tệ</option>
          <option value="2">2 ⭐ Tệ</option>
          <option value="3">3 ⭐ Bình thường</option>
          <option value="4">4 ⭐ Tốt</option>
          <option value="5">5 ⭐ Tuyệt vời</option>
        </Select>

        <Label>Bình luận</Label>
        <TextArea name="comment" value={form.comment} onChange={handleChange} />

        <Label>Sản phẩm</Label>
        <Select name="productId" value={form.productId} onChange={handleChange} required>
          <option value="">-- Chọn sản phẩm --</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </Select>

        <Label>Người dùng</Label>
        <Select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">-- Chọn người dùng --</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
        </Select>

        <Label>Ảnh</Label>
        <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <Button type="submit">Lưu</Button>
      </Form>
    </Container>
  );
};

export default ReviewAdd;
