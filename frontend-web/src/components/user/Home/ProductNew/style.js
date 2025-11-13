// src/pages/home/style.js
import styled from "styled-components";

/* ===== Layout Wrapper ===== */
export const Wrapper = styled.div`
  width: 100%;
  padding: 40px 0;
`;

/* ===== Section Title ===== */
export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: #222;
`;

/* ===== Product Grid ===== */
export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 25px;
  padding: 0 20px;
`;

/* ===== Product Card ===== */
export const CardWrapper = styled.div`
  position: relative;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }
`;

/* ===== Image ===== */
export const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  background-color: #f8f8f8;
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

/* ===== Info ===== */
export const Info = styled.div`
  padding: 12px 15px;
`;

export const Name = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
`;

export const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Price = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
`;

/* ===== Buttons ===== */
export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 15px 15px;
`;

export const Button = styled.button`
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? "#111" : "#eee")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#333")};
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.9;
  }
`;
