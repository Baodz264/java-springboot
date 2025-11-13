import styled from "styled-components";

/* Wrapper bảng ảnh */
export const ImageTableWrapper = styled.div`
  margin-top: 20px;

  button.add-button {
    background: linear-gradient(45deg, #4e73df, #224abe);
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(45deg, #224abe, #4e73df);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
    }
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    background-color: #fff;
  }

  th, td {
    padding: 14px 12px;
    text-align: left;
  }

  th {
    background-color: #f0f4f8;
    font-weight: 600;
    color: #2c3e50;
  }

  tr {
    transition: all 0.2s ease;
  }

  tr:hover {
    background-color: #e8f0fe;
  }

  td img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  td button {
    margin-right: 6px;
    padding: 6px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-1px);
      opacity: 0.9;
    }
  }

  td button.edit {
    background-color: #17a2b8;
    color: #fff;
  }

  td button.delete {
    background-color: #dc3545;
    color: #fff;
  }
`;

/* Modal overlay */
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

/* Modal content */
export const ModalContent = styled.div`
  background: #fff;
  padding: 30px 25px;
  width: 440px;
  max-width: 95%;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;

  h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    text-align: center;
  }

  form input[type="text"],
  form input[type="file"] {
    width: 100%;
    display: block;
    box-sizing: border-box; /* đảm bảo padding không vượt width */
    padding: 10px 14px;
    margin-bottom: 14px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #4e73df;
      box-shadow: 0 0 8px rgba(78,115,223,0.3);
    }

    /* Cho file input trông đẹp hơn */
    &::-webkit-file-upload-button {
      padding: 8px 14px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(45deg, #4e73df, #224abe);
      color: #fff;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    &::-webkit-file-upload-button:hover {
      background: linear-gradient(45deg, #224abe, #4e73df);
      transform: translateY(-1px);
    }
  }

  form img.preview {
    display: block;
    width: 180px;
    height: 180px;
    object-fit: cover;
    margin: 10px auto;
    border-radius: 12px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  form .btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 10px;
  }

  form button.submit {
    background: linear-gradient(45deg, #28a745, #1e7e34);
    color: #fff;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(45deg, #1e7e34, #28a745);
      transform: translateY(-2px);
    }
  }

  form button.cancel {
    background: linear-gradient(45deg, #6c757d, #5a6268);
    color: #fff;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 500;
    transition: all 0.3s ease;
    &:hover {
      background: linear-gradient(45deg, #5a6268, #6c757d);
      transform: translateY(-2px);
    }
  }
`;
