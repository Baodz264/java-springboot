// src/pages/admin/Addresses/style.js
import styled from "styled-components";

// Wrapper tổng thể
export const Container = styled.div`
  padding: 20px;
  h2 {
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    color: #333;
  }
`;

// Table danh sách
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-family: Arial, sans-serif;

  th, td {
    padding: 12px 10px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
    font-size: 14px;
    color: #555;
  }

  th {
    background-color: #fafafa;
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

// Button kiểu gạch chân, màu sắc nổi bật
export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0 5px;
  font-weight: 500;
  text-decoration: underline;
  transition: color 0.2s, text-decoration 0.2s;

  &:hover {
    text-decoration: none;
  }

  &.delete {
    color: #ff3b30;           // đỏ tươi nổi bật
    &:hover {
      color: #c62828;         // đỏ đậm khi hover
    }
  }

  &.edit {
    color: #1976d2;           // xanh dương
    &:hover {
      color: #0d47a1;         // xanh đậm khi hover
    }
  }

  &.view {
    color: #f57c00;           // cam
    &:hover {
      color: #e65100;         // cam đậm khi hover
    }
  }
`;

// Ô tìm kiếm
export const SearchInput = styled.input`
  padding: 8px 12px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 3px rgba(25, 118, 210, 0.5);
  }
`;

// Nếu muốn thêm nút tìm kiếm cạnh ô input
export const SearchButton = styled.button`
  padding: 8px 14px;
  background-color: #1976d2;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #0d47a1;
  }
`;
