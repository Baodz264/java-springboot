import React from 'react';
import { FooterContainer } from './style';

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Shop Admin Dashboard</p>
    </FooterContainer>
  );
};

export default Footer;
