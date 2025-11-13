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

// Button dạng link, dùng transient prop $variant
export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ $variant }) =>
    $variant === "back" ? "#6c757d" :
    "#007bff"};
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;
