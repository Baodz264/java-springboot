// src/pages/admin/Orders/style.js
import styled, { css } from "styled-components";

/* --------- Layout Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  margin: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;

  p {
    margin: 6px 0;
  }

  ul {
    margin: 6px 0 0 20px;
  }
`;

/* --------- Badge --------- */
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
    $status === "PROCESSING" &&
    css`
      background: #cce5ff;
      color: #004085;
    `}

  ${({ $status }) =>
    ($status === "COMPLETED" || $status === "DELIVERED") &&
    css`
      background: #d4edda;
      color: #155724;
    `}

  ${({ $status }) =>
    ($status === "CANCELLED" || $status === "FAILED") &&
    css`
      background: #f8d7da;
      color: #721c24;
    `}
`;

/* --------- Button --------- */
export const Button = styled.button`
  background: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  margin: 4px 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;

/* --------- Form --------- */
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

/* --------- Input --------- */
export const Input = styled.input`
  flex: 1 1 200px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

/* --------- Select --------- */
export const Select = styled.select`
  flex: 1 1 200px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

/* --------- Table --------- */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #dee2e6;
    padding: 8px 12px;
    text-align: left;
    font-size: 14px;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #f2f2f2;
  }
`;
