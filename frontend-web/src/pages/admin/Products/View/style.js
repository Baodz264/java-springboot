import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0,0,0,0.08);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

export const Thumbnail = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 30px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
`;

export const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    width: 150px;
    text-align: left;
    padding: 10px;
    background-color: #f4f4f4;
    color: #34495e;
    font-weight: 600;
  }

  td {
    padding: 10px;
    color: #2c3e50;
  }

  tr:hover {
    background-color: #fafafa;
  }
`;

export const SubTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
  color: #34495e;
`;

export const TableWrapper = styled.div`
  margin-bottom: 30px;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f4f4f4;
    text-align: left;
  }
  td img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
`;
export const ModalBackdrop = styled.div`
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background:#fff;
  padding:25px;
  border-radius:8px;
  width: 420px;
  max-width: 90%;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  label { display:block; margin-bottom: 6px; font-weight: 500; }
  input, select { width: 100%; padding: 8px 10px; border: 1px solid #ccc; border-radius: 5px; }
`;

export const Button = styled.button`
  background-color: ${(props) => props.$bg || "#3498db"};
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  &:hover { opacity: 0.85; }
`;