import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: #222;
  margin-bottom: 25px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 12px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 12px 20px;
  margin-bottom: 20px;
`;

export const Label = styled.b`
  color: #333;
  font-size: 15px;
`;

export const Value = styled.p`
  margin: 0;
  font-size: 15px;
  color: #555;
`;

export const ImgPreview = styled.img`
  display: block;
  margin: 25px auto;
  max-width: 300px;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
`;

export const Button = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  ${(props) =>
    props.$variant === "default" &&
    css`
      background: #6c757d;
      color: white;

      &:hover {
        background: #5a6268;
      }
    `}
`;
