// style.js
import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.div`
  margin-bottom: 25px;
  text-align: center;

  h2 {
    font-size: 26px;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 10px;
    display: inline-block;
  }
`;

export const DetailBox = styled.div`
  background: #fafafa;
  padding: 20px 25px;
  border-radius: 10px;
  margin-bottom: 25px;

  p {
    font-size: 15px;
    color: #444;
    margin: 12px 0;
    border-bottom: 1px dashed #e5e5e5;
    padding-bottom: 8px;

    strong {
      display: inline-block;
      width: 150px;
      color: #222;
    }

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const Badge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;

  ${({ status }) =>
    status === "COMPLETED" &&
    css`
      background: #d4edda;
      color: #155724;
    `}

  ${({ status }) =>
    status === "PENDING" &&
    css`
      background: #fff3cd;
      color: #856404;
    `}

  ${({ status }) =>
    status === "FAILED" &&
    css`
      background: #f8d7da;
      color: #721c24;
    `}
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 15px;
  display: inline-block;

  &:hover {
    color: #0056b3;
  }
`;
