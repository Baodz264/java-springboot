// src/layouts/admin/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarContainer, SidebarMenu, SidebarItem } from "./style";
import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaTag,
  FaBars,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menus = [
    { path: "/admin/dashboard", label: "Bảng điều khiển", icon: <FaBars /> },
    {
      label: "Người dùng",
      icon: <FaUsers />,
      children: [
        { path: "/admin/users", label: "Danh sách người dùng" },
        { path: "/admin/addresses", label: "Địa chỉ" },
        { path: "/admin/chats", label: "Trò chuyện" },
      ],
    },
    {
      label: "Sản phẩm",
      icon: <FaBox />,
      children: [
        { path: "/admin/products", label: "Danh sách sản phẩm" },
        { path: "/admin/categories", label: "Danh mục" },
        { path: "/admin/brands", label: "Thương hiệu" },
        { path: "/admin/reviews", label: "Đánh giá" },
      ],
    },
    {
      label: "Đơn hàng",
      icon: <FaShoppingCart />,
      children: [
        { path: "/admin/orders", label: "Danh sách đơn hàng" },
        { path: "/admin/shippings", label: "Vận chuyển" },
        { path: "/admin/payments", label: "Thanh toán" },
      ],
    },
    {
      label: "Tiếp thị",
      icon: <FaTag />,
      children: [
        { path: "/admin/vouchers", label: "Mã giảm giá" },
        { path: "/admin/banners", label: "Banner quảng cáo" },
      ],
    },
  ];

  return (
    // ✅ dùng $isCollapsed thay vì isCollapsed
    <SidebarContainer $isCollapsed={isCollapsed}>
      <h2 className="logo">{isCollapsed ? "S" : "CLOTHING STORE"}</h2>
      <SidebarMenu>
        {menus.map((item) =>
          item.children ? (
            <div key={item.label}>
              <SidebarItem
                onClick={() => toggleMenu(item.label)}
                className={openMenus[item.label] ? "open" : ""}
              >
                <div className="submenu-toggle">
                  <div className="left">
                    {item.icon}
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed &&
                    (openMenus[item.label] ? (
                      <FaChevronDown className="arrow" />
                    ) : (
                      <FaChevronRight className="arrow" />
                    ))}
                </div>
              </SidebarItem>
              {openMenus[item.label] && !isCollapsed && (
                <div className="submenu">
                  {item.children.map((sub) => (
                    <SidebarItem
                      key={sub.path}
                      className={location.pathname === sub.path ? "active" : ""}
                    >
                      <Link to={sub.path}>{sub.label}</Link>
                    </SidebarItem>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <SidebarItem
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </SidebarItem>
          )
        )}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
