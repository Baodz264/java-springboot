// src/layouts/admin/style.js
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #f9fafb;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background: #f3f4f6;
  overflow-y: auto;
`;

// --- Sidebar ---
export const SidebarContainer = styled.div`
  width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '240px')};
  background: linear-gradient(180deg, #1e293b 0%, #111827 100%);
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, background 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.25);

  .logo {
    font-size: ${({ $isCollapsed }) => ($isCollapsed ? '20px' : '22px')};
    font-weight: 700;
    letter-spacing: 1px;
    padding: 18px;
    text-align: center;
    border-bottom: 1px solid #334155;
    color: #60a5fa;
    text-transform: uppercase;
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
  flex: 1;
`;

export const SidebarItem = styled.li`
  margin-bottom: 6px;

  a,
  .submenu-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #e5e7eb;
    text-decoration: none;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;
  }

  a:hover,
  .submenu-toggle:hover {
    background: rgba(59, 130, 246, 0.15);
    color: #ffffff;
  }

  &.active > a {
    background: #2563eb;
    color: #fff;
    font-weight: 600;
  }

  /* Nhóm chữ + icon bên trái */
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .arrow {
    font-size: 13px;
    transition: transform 0.3s ease;
  }

  &.open .arrow {
    transform: rotate(90deg);
  }

  /* Submenu */
  .submenu {
    margin-top: 4px;
    margin-left: 18px;
    border-left: 2px solid rgba(59, 130, 246, 0.4);
    padding-left: 10px;
  }

  .submenu a {
    font-size: 13px;
    padding: 8px 12px;
    border-radius: 6px;
    color: #cbd5e1;
  }

  .submenu a:hover {
    background: rgba(59, 130, 246, 0.2);
    color: #fff;
  }

  .submenu .active {
    background: rgba(37, 99, 235, 0.9);
    color: #fff;
    font-weight: 600;
  }
`;

// --- Header ---
export const HeaderContainer = styled.div`
  height: 60px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .menu-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #374151;
  }

  .search-input {
    border: 1px solid #d1d5db;
    padding: 6px 12px;
    border-radius: 6px;
    outline: none;
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .username {
    font-weight: 500;
  }

  .logout-btn {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .logout-btn:hover {
    background: #dc2626;
  }
`;

// --- Footer ---
export const FooterContainer = styled.footer`
  height: 50px;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
