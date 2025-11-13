import styled from "styled-components";

// Container chính
export const Container = styled.div`
  padding: 20px 40px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
`;

// Header
export const Header = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

// Table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  thead tr {
    background-color: #f0f0f0;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 15px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  font-size: 14px;
  color: #444;
`;

// Avatar hình tròn
export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

// Button dạng link, dùng transient prop $variant
export const Button = styled.button`
  padding: 4px 10px;
  margin-right: 6px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ $variant }) =>
    $variant === "edit" ? "#0d6efd" :
    $variant === "delete" ? "#dc3545" :
    $variant === "add" ? "#198754" :
    "#0d6efd"};
  background: none;

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    margin-right: 0;
  }
`;
export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
`;

export const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  flex: 1;
  font-size: 14px;
`;