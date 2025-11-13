import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start; /* ✅ căn trái */
  align-items: center;
  margin-top: 24px;
  width: 100%;
`;

export const AddToCartBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff;
  color: #111111;
  border: 1.5px solid #ddd;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  padding: 14px 26px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  margin-left: 8px; /* ✅ tạo khoảng cách nhẹ bên trái, trông cân đối hơn */

  &:hover {
    background: #111111;
    color: #ffffff;
    border-color: #111111;
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.25s ease;
  }

  &:hover svg {
    transform: scale(1.05);
  }
`;
