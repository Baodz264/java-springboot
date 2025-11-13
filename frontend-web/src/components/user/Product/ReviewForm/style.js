import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

/* 🧩 Form chính */
export const FormWrapper = styled.form`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeIn} 0.25s ease-out;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  @media(max-width: 480px){
    width: 95%;
    padding: 12px;
  }
`;

/* 🏷 Tiêu đề */
export const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  color: #111;
`;

/* ⭐ Rating */
export const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const Star = styled.div`
  cursor: pointer;
  color: ${(props) => (props.$filled ? "#FFB800" : "#ddd")};
  font-size: 22px;
  transition: transform 0.2s ease, color 0.2s ease;
  &:hover {
    transform: scale(1.3);
    color: #ffcc33;
  }
`;

/* 📝 Textarea */
export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 0.95rem;
  border: 1px solid #eee;
  border-radius: 12px;
  resize: none;
  outline: none;
  background: #fafafa;
  min-height: 80px;
  line-height: 1.4;
  transition: border 0.25s ease, box-shadow 0.25s ease;
  &:focus {
    border-color: #ff6a00;
    box-shadow: 0 0 0 2px rgba(255, 106, 0, 0.15);
    background: #fff;
  }
`;

/* 📤 Upload hình */
export const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1.5px dashed #ff6a00;
  border-radius: 12px;
  color: #ff6a00;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  &:hover {
    background: #fff2e6;
    transform: scale(1.03);
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

/* 🖼 Preview ảnh */
export const ImagePreviewContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`;

export const PreviewImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  &:hover {
    transform: scale(1.08);
    border-color: #ff6a00;
  }
`;

/* 🧩 Nút submit */
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const SubmitButton = styled.button`
  padding: 8px 20px;
  background: #ff6a00;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  &:hover {
    background: #e55b00;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(255, 106, 0, 0.3);
  }
  &:active {
    transform: scale(0.97);
  }
`;

/* 🌀 Loading */
export const LoadingText = styled.p`
  text-align: center;
  color: #ff6a00;
  font-weight: 500;
  font-size: 0.9rem;
  animation: ${fadeIn} 0.3s ease-in-out infinite alternate;
`;
