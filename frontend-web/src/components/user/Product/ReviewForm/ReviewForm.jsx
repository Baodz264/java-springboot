import React, { useState, useContext } from "react";
import {
  FormWrapper,
  Title,
  RatingSection,
  Star,
  TextArea,
  UploadLabel,
  HiddenInput,
  PreviewImage,
  ButtonWrapper,
  SubmitButton,
  ImagePreviewContainer,
  LoadingText,
} from "./style";
import { Star as StarIcon, Upload } from "lucide-react";
import ReviewService from "../../../../services/reviewService";
import { UserContext } from "../../../../contexts/UserContext";

const ReviewForm = ({ productId, onSuccess, initialRating = 0, initialComment = "" }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState(initialComment);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Giới hạn tối đa 5 hình ảnh
    setImages(files.slice(0, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("⚠️ Bạn cần đăng nhập để gửi đánh giá.");
    if (!rating) return alert("⭐ Vui lòng chọn số sao đánh giá!");
    if (!comment.trim()) return alert("💬 Vui lòng nhập nội dung đánh giá!");

    try {
      setLoading(true);

      const review = {
        rating,
        comment,
        productId,
        userId: user.id,
      };

      // Chỉ gửi ảnh đầu tiên (hoặc backend có thể support multiple)
      const imageFile = images.length > 0 ? images[0] : null;

      await ReviewService.create(review, imageFile);

      alert("🎉 Cảm ơn bạn đã gửi đánh giá!");
      setRating(0);
      setComment("");
      setImages([]);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("❌ Lỗi khi gửi đánh giá:", error);
      if (error.response?.status === 403) {
        alert("⚠️ Bạn không có quyền gửi đánh giá.");
      } else if (error.response?.status === 401) {
        alert("⛔ Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
      } else {
        alert("❌ Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>📝 Viết đánh giá</Title>

      <RatingSection>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            $filled={star <= (hoverRating || rating)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          >
            <StarIcon size={24} />
          </Star>
        ))}
      </RatingSection>

      <TextArea
        placeholder="Chia sẻ cảm nhận của bạn..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
      />

      <UploadLabel>
        <Upload size={18} />
        <span>Thêm ảnh (tối đa 5)</span>
        <HiddenInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={loading}
        />
      </UploadLabel>

      <ImagePreviewContainer>
        {images.map((file, idx) => (
          <PreviewImage
            key={idx}
            src={URL.createObjectURL(file)}
            alt={`img-${idx}`}
          />
        ))}
      </ImagePreviewContainer>

      <ButtonWrapper>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </SubmitButton>
      </ButtonWrapper>

      {loading && <LoadingText>⏳ Đang xử lý...</LoadingText>}
    </FormWrapper>
  );
};

export default ReviewForm;
