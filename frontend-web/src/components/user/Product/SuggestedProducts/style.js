import styled from "styled-components";

export const SuggestedContainer = styled.div`
  margin-top: 40px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
`;

export const ProductList = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ProductCard = styled.div`
  width: 160px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    width: 140px;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-bottom: 1px solid #f0f0f0;
`;

export const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin: 8px;
  color: #333;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #ff4d4f;
  margin: 0 8px 8px;
`;
