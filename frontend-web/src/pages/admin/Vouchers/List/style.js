import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  background: #f8f9fa;
  padding: 12px 15px;
  text-align: left;
  font-weight: 600;
  color: #444;
  border-bottom: 2px solid #ddd;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #555;
  vertical-align: middle;
`;

export const ImgPreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

export const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0 6px;
  font-size: 14px;
  font-weight: 500;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #0056b3;
  }

  ${(props) =>
    props.$variant === "delete" &&
    css`
      color: #dc3545;

      &:hover {
        color: #a71d2a;
      }
    `}

  ${(props) =>
    props.$variant === "add" &&
    css`
      color: #28a745;

      &:hover {
        color: #1e7e34;
      }
    `}

  ${(props) =>
    props.$variant === "edit" &&
    css`
      color: #ffc107;

      &:hover {
        color: #d39e00;
      }
    `}
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;

  &:focus {
    outline: none;
    border-color: #4e73df;
    box-shadow: 0 0 4px rgba(78, 115, 223, 0.5);
  }
`;