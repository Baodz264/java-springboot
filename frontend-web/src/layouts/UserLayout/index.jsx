import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { LayoutWrapper, MainContent } from "./style";

const SiteLayout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Nav />
      <MainContent>
        <Outlet /> {/* Nội dung trang con hiển thị đẹp như card */}
      </MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default SiteLayout;
