import styled from "styled-components";

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #d32f2f;
`;

export const OldPrice = styled.span`
  font-size: 1.2rem;
  color: #888;
  text-decoration: line-through;
`;

export const DiscountBadge = styled.span`
  background-color: #ff3d00;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
`;

export const SavingText = styled.span`
  color: #388e3c;
  font-size: 0.95rem;
  font-weight: 500;
`;
