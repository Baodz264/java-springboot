import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.IconWrapper>
        <S.Icon>🚫</S.Icon>
      </S.IconWrapper>
      <S.Code>404</S.Code>
      <S.Message>Oops! Trang bạn tìm kiếm không tồn tại.</S.Message>
      <S.Button onClick={() => navigate('/')}>Quay về trang chủ</S.Button>
    </S.Container>
  );
}
