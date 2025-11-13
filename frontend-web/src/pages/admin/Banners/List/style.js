import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px 15px;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  vertical-align: middle;

  img {
    border-radius: 6px;
    border: 1px solid #ddd;
  }
`;

/* Base styles cho button/link */
const baseButton = css`
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  margin: 0 5px;
  transition: all 0.2s ease;
  text-decoration: none;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid currentColor;
  }

  ${({ $variant }) =>
    $variant === "add" &&
    css`
      color: #28a745;
    `}

  ${({ $variant }) =>
    $variant === "edit" &&
    css`
      color: #007bff;
    `}

  ${({ $variant }) =>
    $variant === "delete" &&
    css`
      color: #dc3545;
    `}
`;

export const Button = styled.button`
  ${baseButton}
`;

export const LinkButton = styled(Link)`
  ${baseButton}
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