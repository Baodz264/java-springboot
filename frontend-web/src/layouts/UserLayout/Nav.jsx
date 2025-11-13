import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import { NavWrapper, NavList, NavItem } from "./style";

function Nav() {
  return (
    <NavWrapper>
      <NavList>
        <NavItem>
          <Link to="/">Trang chủ</Link>
        </NavItem>
        <NavItem>
          <Link to="/products">Sản phẩm</Link>
        </NavItem>
        <NavItem>
          <Link to="/promotions">Khuyến mãi</Link>
        </NavItem>
      </NavList>
    </NavWrapper>
  );
}

export default Nav;
