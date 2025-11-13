// src/pages/admin/Payments/style.js
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 22px;
    color: #333;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #eee;
    padding: 10px 12px;
    text-align: left;
    font-size: 14px;
  }

  th {
    background: #f5f5f5;
    font-weight: 600;
  }

  tr:nth-child(even) {
    background: #fafafa;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.$danger ? "#d9534f" : "#007bff")};
  font-size: 14px;
  cursor: pointer;
  margin: 0 6px;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`;

export const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    props.$status === "SUCCESS"
      ? "#28a745"
      : props.$status === "PENDING"
      ? "#ffc107"
      : "#dc3545"};
`;
export const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  font-size: 15px;
  padding: 30px 0;
  font-style: italic;
`;