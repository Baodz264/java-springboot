import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 16px;
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
  grid-template-columns: 150px 1fr;
  gap: 12px 20px;
  margin-bottom: 20px;

  p {
    margin: 0;
    font-size: 15px;
    color: #444;
  }

  b {
    color: #111;
  }
`;

export const Status = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => (props.$active ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.$active ? "#155724" : "#721c24")};
`;

export const ImgPreview = styled.img`
  display: block;
  margin: 20px auto 0 auto;
  max-width: 100%;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
`;
