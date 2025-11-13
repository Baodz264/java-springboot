// src/layouts/admin/index.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { LayoutContainer, ContentWrapper, MainContent } from './style';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <LayoutContainer>
      <Sidebar isCollapsed={isCollapsed} />
      <ContentWrapper>
        <Header onToggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default AdminLayout;
