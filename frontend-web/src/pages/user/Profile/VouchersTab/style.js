import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #fafafa;
  border-radius: 12px;
  min-height: 500px;
`;

export const Header = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #ee4d2d;
  margin-bottom: 25px;
  text-align: center;
`;

export const VoucherList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
`;

export const VoucherCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px dashed #ee4d2d;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  ${({ $claimed }) =>
    $claimed &&
    css`
      opacity: 0.7;
      filter: grayscale(0.6);
      border-style: solid;
    `}
`;

export const VoucherImage = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  background: #fef2f2;
  border-right: 1px dashed #ee4d2d;
`;

export const VoucherInfo = styled.div`
  flex: 1;
  padding: 15px;
`;

export const VoucherTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
`;

export const VoucherValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #ee4d2d;
  margin-bottom: 6px;
`;

export const VoucherCondition = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 4px;
`;

export const VoucherExpiry = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;

export const VoucherButton = styled.button`
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#ee4d2d")};
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#d73211")};
  }
`;
