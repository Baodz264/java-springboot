import styled from "styled-components";

// Grid đánh giá
export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Card đánh giá
export const ReviewCard = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

// Ảnh đánh giá
export const ReviewImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

// Nội dung review
export const ReviewContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// Rating
export const ReviewRating = styled.div`
  font-weight: 600;
  color: #ffb400;
`;

// Comment
export const ReviewComment = styled.div`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.2rem;
  min-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Tên người dùng
export const ReviewUser = styled.div`
  font-size: 0.8rem;
  color: #777;
`;
