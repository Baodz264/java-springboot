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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 0;
  }
`;

/* --------- Table --------- */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f0f0f0;
    font-weight: 600;
  }

  tbody tr:hover {
    background: #f9f9f9;
  }

  img {
    max-width: 80px;
    max-height: 80px;
    border-radius: 6px;
    object-fit: cover;
    border: 1px solid #ccc;
  }

  td > button {
    margin-right: 6px;
  }
`;

/* --------- Button --------- */
export const Button = styled.button`
  padding: 0; /* chữ gọn, không cần padding */
  font-size: 14px;
  font-weight: 500;
  border: none;
  background: none; /* loại bỏ nền */
  color: ${({ $danger }) => ($danger ? "#dc3545" : "#007bff")};
  text-decoration: underline; /* gạch chân */
  cursor: pointer;

  &:hover {
    color: ${({ $danger }) => ($danger ? "#c82333" : "#0056b3")};
  }
`;
export const SearchInput = styled.input`
  padding: 6px 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 200px;

  &:focus {
    border-color: #4e73df;
  }
`;
