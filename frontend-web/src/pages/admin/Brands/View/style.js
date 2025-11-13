import styled from "styled-components";

/* --------- Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

/* --------- Header --------- */
export const Header = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
  }
`;

/* --------- Detail --------- */
export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #ddd;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;

    strong {
      width: 120px;
      display: inline-block;
    }
  }

  img {
    margin-top: 10px;
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
    object-fit: cover;
    border: 1px solid #ccc;
  }
`;

/* --------- Button --------- */
export const Button = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #007bff;
  color: #fff;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;
