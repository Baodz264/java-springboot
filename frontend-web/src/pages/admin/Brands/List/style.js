import styled from "styled-components";

/* --------- Container --------- */
export const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

/* --------- Header --------- */
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin: 0;
  }
`;

/* --------- Table --------- */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px 14px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    text-align: left;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 13px;
    color: #555;
  }

  tr:hover {
    background: #fdfdfd;
  }
`;

/* --------- Button --------- */
export const Button = styled.button`
  background: none;             /* bỏ màu nền */
  border: none;                 /* bỏ viền */
  color: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")}; /* màu chữ */
  text-decoration: underline;   /* gạch chân */
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  margin: 0 4px 4px 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;

/* --------- Badge --------- */
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#155724" : "#721c24")};
  background-color: ${({ $active }) => ($active ? "#d4edda" : "#f8d7da")};
`;

/* --------- Image preview --------- */
export const ImgPreview = styled.img`
  width: 80px;
  height: 40px;
  object-fit: contain;
  border-radius: 5px;
`;
