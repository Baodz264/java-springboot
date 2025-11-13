import React, { useEffect, useState, useCallback } from "react";
import {
  ReviewContainer,
  ReviewHeader,
  FilterBar,
  FilterButton,
  ReviewListWrapper,
  ReviewItem,
  UserInfo,
  Avatar,
  UserDetails,
  UserName,
  ReviewDate,
  Stars,
  Star,
  StarIconStyled,
  ReviewContent,
  ReviewImages,
  ReviewImage,
  Divider,
  EmptyMessage,
  PaginationWrapper,
  LoadMoreButton,
} from "./style";
import ReviewService from "../../../../services/reviewService";
import UserService from "../../../../services/userService";
import { toast } from "react-toastify";
import { Star as StarIcon } from "lucide-react";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);
  const [selectedRating, setSelectedRating] = useState(null); // ⭐ bộ lọc sao hiện tại

  // ✅ Fetch data
  const fetchData = useCallback(async () => {
    try {
      const [revList, usrs] = await Promise.all([
        ReviewService.getAll(),
        UserService.getAll(),
      ]);
      const reviewData =
        revList?.data?.content || revList?.data || revList || [];
      const filteredReviews = reviewData.filter(
        (r) => r.productId === productId || r.product?.id === productId
      );
      setReviews(filteredReviews);
      setUsers(usrs);
    } catch (error) {
      console.error("❌ Lỗi tải dữ liệu:", error);
      toast.error("Không thể tải đánh giá!");
    }
  }, [productId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Lọc review theo rating
  const filteredReviews = selectedRating
    ? reviews.filter((r) => Math.round(r.rating) === selectedRating)
    : reviews;

  const getUserName = (userId) =>
    users.find((u) => u.id === userId)?.fullName || "Người dùng ẩn danh";

  const getUserAvatar = (review) => {
    if (review.user?.avatarUrl)
      return review.user.avatarUrl.startsWith("http")
        ? review.user.avatarUrl
        : `http://localhost:8080${review.user.avatarUrl}`;
    const userFromList = users.find((u) => u.id === review.userId);
    if (userFromList?.avatarUrl)
      return userFromList.avatarUrl.startsWith("http")
        ? userFromList.avatarUrl
        : `http://localhost:8080${userFromList.avatarUrl}`;
    return "https://i.pravatar.cc/100";
  };

  const loadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <ReviewContainer>
      <ReviewHeader>Đánh giá của khách hàng ({reviews.length})</ReviewHeader>

      {/* ⭐ Bộ lọc số sao */}
      <FilterBar>
        {[5, 4, 3, 2, 1].map((star) => (
          <FilterButton
            key={star}
            $active={selectedRating === star}
            onClick={() =>
              setSelectedRating(selectedRating === star ? null : star)
            }
          >
            {star} <StarIcon size={14} fill="#FFD700" color="#FFD700" />{" "}
            {selectedRating === star && "(✓)"}
          </FilterButton>
        ))}
      </FilterBar>

      {filteredReviews.length === 0 ? (
        <EmptyMessage>Không có đánh giá phù hợp.</EmptyMessage>
      ) : (
        <ReviewListWrapper>
          {filteredReviews.slice(0, visibleCount).map((review) => (
            <React.Fragment key={review.id}>
              <ReviewItem>
                <UserInfo>
                  <Avatar
                    src={getUserAvatar(review)}
                    alt={getUserName(review.userId)}
                  />
                  <UserDetails>
                    <UserName>
                      {review.user?.fullName || getUserName(review.userId)}
                    </UserName>
                    <ReviewDate>
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "-"}
                    </ReviewDate>
                  </UserDetails>
                </UserInfo>

                <Stars>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} $filled={i <= review.rating}>
                      <StarIconStyled>
                        <StarIcon size={16} />
                      </StarIconStyled>
                    </Star>
                  ))}
                </Stars>

                <ReviewContent>{review.comment}</ReviewContent>

                {review.imageUrl && (
                  <ReviewImages>
                    {Array.isArray(review.imageUrl) ? (
                      review.imageUrl.map((img, idx) => (
                        <ReviewImage
                          key={idx}
                          src={
                            img.startsWith("http")
                              ? img
                              : `http://localhost:8080${img}`
                          }
                          alt="review-img"
                          onError={(e) =>
                            (e.target.src = "/images/default-review.png")
                          }
                        />
                      ))
                    ) : (
                      <ReviewImage
                        src={
                          review.imageUrl.startsWith("http")
                            ? review.imageUrl
                            : `http://localhost:8080${review.imageUrl}`
                        }
                        alt="review-img"
                        onError={(e) =>
                          (e.target.src = "/images/default-review.png")
                        }
                      />
                    )}
                  </ReviewImages>
                )}
              </ReviewItem>
              <Divider />
            </React.Fragment>
          ))}
        </ReviewListWrapper>
      )}

      {visibleCount < filteredReviews.length && (
        <PaginationWrapper>
          <LoadMoreButton onClick={loadMore}>Xem thêm đánh giá</LoadMoreButton>
        </PaginationWrapper>
      )}
    </ReviewContainer>
  );
};

export default ReviewList;
