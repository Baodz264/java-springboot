import React, { useEffect, useState } from "react";
import ReviewService from "../../../../services/reviewService";
import ProductService from "../../../../services/productService";
import UserService from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { Container, Header, Button, Table, ImgPreview } from "./style";
import { toast } from "react-toastify";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Bộ lọc tìm kiếm
  const [keyword, setKeyword] = useState("");
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const navigate = useNavigate();

  // ✅ Lấy dữ liệu ban đầu
  const fetchData = async () => {
    try {
      const [revList, prods, usrs] = await Promise.all([
        ReviewService.getAll(),
        ProductService.getAll(),
        UserService.getAll(),
      ]);

      // Reviews có thể nằm trong content hoặc data tuỳ backend
      const reviewData =
        revList?.data?.content || revList?.data || revList || [];
      setReviews(reviewData);

      setProducts(prods);
      setUsers(usrs);
    } catch (error) {
      console.error("❌ Lỗi tải dữ liệu:", error);
      toast.error("Không thể tải dữ liệu!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Xóa review
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa review này?")) {
      try {
        await ReviewService.delete(id);
        toast.success("Xóa review thành công!");
        fetchData();
      } catch (error) {
        console.error("❌ Lỗi khi xóa review:", error);
        toast.error("Không thể xóa review!");
      }
    }
  };

  // ✅ Tìm kiếm review
  const handleSearch = async () => {
    try {
      const params = {
        keyword: keyword || undefined,
        productId: productId || undefined,
        userId: userId || undefined,
        minRating: minRating || undefined,
        maxRating: maxRating || undefined,
      };
      const res = await ReviewService.search(params);
      const reviewData =
        res?.data?.content || res?.data || res || [];
      setReviews(reviewData);
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm:", error);
      toast.error("Lỗi khi tìm kiếm!");
    }
  };

  // ✅ Reset filter
  const resetSearch = () => {
    setKeyword("");
    setProductId("");
    setUserId("");
    setMinRating("");
    setMaxRating("");
    fetchData();
  };

  // ✅ Hàm lấy tên sản phẩm & người dùng
  const getProductName = (id) =>
    products.find((p) => String(p.id) === String(id))?.name || "N/A";

  const getUserName = (id) =>
    users.find((u) => String(u.id) === String(id))?.fullName || "N/A";

  return (
    <Container>
      <Header>
        <h2>Quản lý Reviews</h2>
        <Button onClick={() => navigate("/admin/reviews/add")}>
          + Thêm review
        </Button>
      </Header>

      {/* 🔍 Bộ lọc tìm kiếm */}
      <div
        style={{
          margin: "15px 0",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Tìm theo bình luận..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">-- Chọn sản phẩm --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">-- Chọn người dùng --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullName}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Rating tối thiểu"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating tối đa"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
        />
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        <Button onClick={resetSearch}>Reset</Button>
      </div>

      {/* Danh sách review */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sản phẩm</th>
            <th>Người dùng</th>
            <th>Rating</th>
            <th>Bình luận</th>
            <th>Ảnh</th>
            <th>Likes</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.product?.name || getProductName(r.productId)}</td>
                <td>{r.user?.fullName || getUserName(r.userId)}</td>
                <td>⭐ {r.rating}</td>
                <td>{r.comment}</td>
                <td>
                  {r.imageUrl ? (
                    <ImgPreview
                      src={
                        r.imageUrl.startsWith("http")
                          ? r.imageUrl
                          : `http://localhost:8080${r.imageUrl}`
                      }
                      alt={r.product?.name || "review"}
                      onError={(e) => {
                        e.target.src = "/images/default-review.png";
                      }}
                    />
                  ) : (
                    <ImgPreview
                      src="/images/default-review.png"
                      alt="No Image"
                    />
                  )}
                </td>
                <td>{r.likes ?? 0}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/admin/reviews/view/${r.id}`)}
                  >
                    Xem
                  </Button>
                  <Button
                    onClick={() => navigate(`/admin/reviews/edit/${r.id}`)}
                  >
                    Sửa
                  </Button>
                  <Button $danger onClick={() => handleDelete(r.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ReviewList;
