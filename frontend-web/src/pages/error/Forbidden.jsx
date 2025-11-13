import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.IconWrapper>
        <S.Icon>🔒</S.Icon>
      </S.IconWrapper>
      <S.Code>403</S.Code>
      <S.Message>Bạn không có quyền truy cập trang này.</S.Message>
      <S.Button onClick={() => navigate('/')}>Quay về trang chủ</S.Button>
    </S.Container>
  );
}
