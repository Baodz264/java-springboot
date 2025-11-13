// src/components/Slider/style.js
import styled, { keyframes } from "styled-components";

export const SliderWrapper = styled.div`
  width: 100%;
  height: 300px; /* chỉnh cao banner */
  overflow: hidden;
  position: relative;
`;

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  animation: ${fade} 1s ease-in-out;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const SlideTitle = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  background-color: rgba(0,0,0,0.4);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
`;
