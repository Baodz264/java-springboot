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

/* --------- Form tìm kiếm --------- */
export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

/* Input text --------- */
export const Input = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

/* Select dropdown --------- */
export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

/* --------- Table --------- */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 14px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    text-align: left;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 13px;
    color: #555;
  }

  tr:hover {
    background: #fdfdfd;
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
  background: none;
  border: none;
  color: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;
