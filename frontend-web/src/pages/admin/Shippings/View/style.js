// src/pages/admin/Shippings/style.js
import styled, { css } from "styled-components";

/* --------- Layout Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  margin: 20px;
`;

/* --------- Header --------- */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

/* --------- Detail --------- */
export const Detail = styled.div`
  p {
    font-size: 14px;
    margin: 8px 0;

    strong {
      width: 150px;
      display: inline-block;
      color: #333;
    }
  }
`;

/* --------- Badge (status hiển thị màu) --------- */
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  ${({ $status }) =>
    $status === "PENDING" &&
    css`
      background: #fff3cd;
      color: #856404;
    `}

  ${({ $status }) =>
    $status === "SHIPPING" &&
    css`
      background: #cce5ff;
      color: #004085;
    `}

  ${({ $status }) =>
    ($status === "DELIVERED" || $status === "COMPLETED") &&
    css`
      background: #d4edda;
      color: #155724;
    `}

  ${({ $status }) =>
    ($status === "FAILED" || $status === "CANCELLED" || $status === "RETURNED") &&
    css`
      background: #f8d7da;
      color: #721c24;
    `}
`;

/* --------- Action Box --------- */
export const ActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 12px;
`;

/* --------- Button --------- */
export const Button = styled.button`
  background: #007bff;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:first-child {
    background: #6c757d;
    &:hover {
      background: #5a6268;
    }
  }
`;
