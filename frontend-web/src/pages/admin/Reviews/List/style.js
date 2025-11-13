// src/pages/admin/Reviews/style.js
import styled from "styled-components";

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

/* --------- Button --------- */
export const Button = styled.button`
  background: none;
  border: none;
  color: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  margin: 0 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
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

/* --------- Image Preview --------- */
export const ImgPreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
`;
