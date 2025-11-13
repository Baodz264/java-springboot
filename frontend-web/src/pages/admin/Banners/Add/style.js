import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
  color: #444;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.15);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.15);
  }
`;

export const ImgPreview = styled.img`
  margin-top: 10px;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #eee;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

export const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === "add" &&
    css`
      background: #28a745;
      color: white;

      &:hover {
        background: #218838;
      }
    `}

  ${(props) =>
    props.$variant === "edit" &&
    css`
      background: #007bff;
      color: white;

      &:hover {
        background: #0069d9;
      }
    `}

  ${(props) =>
    props.$variant === "delete" &&
    css`
      background: #dc3545;
      color: white;

      &:hover {
        background: #c82333;
      }
    `}
`;
