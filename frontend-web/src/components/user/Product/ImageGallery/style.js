import styled from "styled-components";

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const MainImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

export const MainImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
  transition: 0.3s ease;
`;

export const ThumbnailsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ArrowButton = styled.button`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ThumbnailList = styled.div`
  display: flex;
  gap: 10px;
  overflow: hidden;
`;

export const ThumbnailItem = styled.div`
  border: ${(props) => (props.$active ? "2px solid #ff4d4f" : "1px solid #ddd")};
  border-radius: 6px;
  padding: 2px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: #ff4d4f;
    transform: scale(1.05);
  }
`;

export const ThumbnailImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
`;
