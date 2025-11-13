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

/* --------- Table --------- */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 14px;
    border-bottom: 1px solid #eee;
    text-align: left;
    font-size: 14px;
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
    ($status === "COMPLETED" || $status === "DELIVERED") &&
    css`
      background: #d4edda;
      color: #155724;
    `}

  ${({ $status }) =>
    ($status === "FAILED" || $status === "CANCELLED") &&
    css`
      background: #f8d7da;
      color: #721c24;
    `}
`;

/* --------- Button (link style có gạch chân) --------- */
export const Button = styled.button`
  background: none;
  border: none;
  color: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  font-size: 14px;
  cursor: pointer;
  margin: 0 6px;
  padding: 0;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ $danger }) => ($danger ? "#a71d2a" : "#0056b3")};
  }
`;
export const SearchBar = styled.input`
  padding: 8px 12px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 220px;
`;