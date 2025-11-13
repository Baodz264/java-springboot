import styled from "styled-components";

// Container chính
export const ReviewContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

// Header
export const ReviewHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

// Wrapper scroll
export const ReviewListWrapper = styled.div`
  max-height: 450px; /* Scroll nếu dài */
  overflow-y: auto;
  padding-right: 6px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

export const ReviewItem = styled.div`
  padding: 10px 0;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.span`
  font-weight: 500;
  font-size: 14px;
`;

export const ReviewDate = styled.span`
  font-size: 12px;
  color: #888;
`;

export const Stars = styled.div`
  display: flex;
  margin: 5px 0;
`;

export const Star = styled.div`
  margin-right: 2px;
  color: ${(props) => (props.$filled ? "#FFD700" : "#ddd")};
`;

export const StarIconStyled = styled.span``; // bạn sẽ dùng icon từ lucide-react

export const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin: 5px 0;
`;

export const ReviewImages = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

export const ReviewImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #eee;
  margin: 10px 0;
`;

export const EmptyMessage = styled.p`
  font-size: 14px;
  color: #888;
  font-style: italic;
`;

export const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const LoadMoreButton = styled.button`
  padding: 6px 12px;
  background: #007bff;
  color: #fff;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0056b3;
  }
`;


export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  background: ${(p) => (p.$active ? "#FFD700" : "#f5f5f5")};
  color: ${(p) => (p.$active ? "#000" : "#555")};
  border: 1px solid ${(p) => (p.$active ? "#FFD700" : "#ddd")};
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #ffe58a;
    border-color: #ffd700;
  }
`;
