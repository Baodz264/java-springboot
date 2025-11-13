import React, { useEffect, useState } from "react";
import ReviewService from "../../../services/reviewService";
import {
  ReviewGrid,
  ReviewCard,
  ReviewImage,
  ReviewContent,
  ReviewRating,
  ReviewComment,
  ReviewUser,
} from "./style";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ReviewService.getAll();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (!reviews.length) return <p>Chưa có đánh giá nào</p>;

  return (
    <ReviewGrid>
      {reviews.map((r) => {
        let imageUrl = r.imageUrl || "/images/default-review.png";
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `http://localhost:8080${imageUrl}`;
        }

        return (
          <ReviewCard key={r.id}>
            <ReviewImage
              src={imageUrl}
              alt={`Review ${r.id}`}
              onError={(e) => (e.target.src = "/images/default-review.png")}
            />
            <ReviewContent>
              <ReviewRating>⭐ {r.rating}/5</ReviewRating>
              <ReviewComment>{r.comment}</ReviewComment>
              <ReviewUser>{r.userName || `User ID: ${r.userId || "Ẩn danh"}`}</ReviewUser>
            </ReviewContent>
          </ReviewCard>
        );
      })}
    </ReviewGrid>
  );
};

export default ReviewList;
