import React, { useEffect, useState } from "react";
import ReviewService from "../../../../services/reviewService";
import ProductService from "../../../../services/productService";
import UserService from "../../../../services/userService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Header,
  Form,
  Label,
  Input,
  TextArea,
  Button,
  Select,
} from "./style";
import { toast } from "react-toastify";

const ReviewEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, prods, usrs] = await Promise.all([
          ReviewService.getById(id),
          ProductService.getAll(),
          UserService.getAll(),
        ]);

        // Chuyển tất cả id sang string
        setForm({
          rating: data.rating?.toString() || "",
          comment: data.comment || "",
          productId: data.product?.id?.toString() || "",
          userId: data.user?.id?.toString() || "",
        });

        setProducts(prods.map((p) => ({ ...p, id: p.id.toString() })));
        setUsers(usrs.map((u) => ({ ...u, id: u.id.toString() })));
      } catch (error) {
        toast.error(
          "Không thể tải dữ liệu review hoặc danh sách sản phẩm/user!"
        );
      }
    };
    fetchData();
  }, [id]);

  if (!form) return <p>Đang tải dữ liệu review...</p>;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ReviewService.update(id, form, imageFile);
      toast.success("Cập nhật review thành công!");
      navigate("/admin/reviews");
    } catch (error) {
      toast.error("Lỗi khi cập nhật review!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Sửa Review</h2>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Label>Đánh giá (Rating)</Label>
        <Select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn mức đánh giá --</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n.toString()}>
              {n} ⭐
            </option>
          ))}
        </Select>

        <Label>Bình luận</Label>
        <TextArea name="comment" value={form.comment} onChange={handleChange} />

        <Label>Sản phẩm</Label>
        <Select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn sản phẩm --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id.toString()}>
              {p.name}
            </option>
          ))}
        </Select>

        <Label>Người dùng</Label>
        <Select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          required
        >
          <option value="">-- Chọn người dùng --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id.toString()}>
              {u.fullName}
            </option>
          ))}
        </Select>

        <Label>Ảnh</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <Button type="submit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default ReviewEdit;
