import React, { useEffect, useState } from "react";
import ReviewService from "../../../../services/reviewService";
import ProductService from "../../../../services/productService";
import UserService from "../../../../services/userService";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Header, DetailBox, ImgPreview, Button } from "./style";
import { toast } from "react-toastify";

const ReviewView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ReviewService.getById(id);
        const data = res.data || res; // ⚙️ Tương thích cả 2 kiểu trả về
        setReview(data);

        // 🔹 Lấy thêm thông tin sản phẩm nếu chưa có
        if (!data.product && data.productId) {
          const prodRes = await ProductService.getById(data.productId);
          setProduct(prodRes.data || prodRes);
        } else {
          setProduct(data.product);
        }

        // 🔹 Lấy thêm thông tin người dùng nếu chưa có
        if (!data.user && data.userId) {
          const userRes = await UserService.getById(data.userId);
          setUser(userRes.data || userRes);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error("❌ Lỗi khi tải chi tiết review:", error);
        toast.error("Không thể tải chi tiết review!");
      }
    };

    fetchData();
  }, [id]);

  if (!review) return <p>Đang tải dữ liệu review...</p>;

  // ✅ Xử lý ảnh
  const getImageUrl = (url) => {
    if (!url) return "/images/default-review.png";
    return url.startsWith("http")
      ? url
      : `http://localhost:8080${url}`;
  };

  return (
    <Container>
      <Header>
        <h2>Chi tiết Review</h2>
      </Header>

      <DetailBox>
        <p><strong>ID:</strong> {review.id}</p>
        <p>
          <strong>Sản phẩm:</strong> {review.product?.name || product?.name || "Không có"}
        </p>
        <p>
          <strong>Người dùng:</strong> {review.user?.fullName || user?.fullName || "Không có"}
        </p>
        <p><strong>Rating:</strong> ⭐ {review.rating}</p>
        <p><strong>Bình luận:</strong> {review.comment}</p>

        <p><strong>Ảnh:</strong></p>
        <ImgPreview
          src={getImageUrl(review.imageUrl)}
          alt="review"
          onError={(e) => (e.target.src = "/images/default-review.png")}
        />

        <p><strong>Likes:</strong> {review.likes ?? 0}</p>
      </DetailBox>

      <Button onClick={() => navigate("/admin/reviews")}>⬅ Quay lại</Button>
    </Container>
  );
};

export default ReviewView;
