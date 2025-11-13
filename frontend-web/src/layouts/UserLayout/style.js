import styled from "styled-components";

/* ---------------- LAYOUT ---------------- */
export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;             // full màn
  padding: 10px 20px;      // padding nội dung
  margin: 0;               // sát màn hình
  background: #f5f5f5;     // nền nhẹ giống Shopee
  min-height: calc(100vh - 80px - 60px); // trừ Header + Footer chiều cao approx
  box-sizing: border-box;

  & > div {
    background: #fff;         // mỗi section con có card trắng
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    padding: 15px;
    margin-bottom: 15px;
  }

  @media(max-width: 768px){
    padding: 8px 10px;
    & > div {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
    }
  }
`;


/* ---------------- HEADER ---------------- */


/* Header Wrapper */
export const HeaderWrapper = styled.header`
  width: 100%;
  color: #fff;
  font-size: 1rem;
  position: relative;
  z-index: 50;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  border-radius: 0 0 20px 20px;
  overflow: hidden;
`;

/* Top Bar */
export const TopBar = styled.div`
  background-color: #b91c1c;
  padding: 0.75rem 0;
  border-bottom: 1px solid #991b1b;

  & > div {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }
`;

export const TopBarList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  color: #ffeeba;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s;
    
    &:hover {
      color: #fff;
    }
  }
`;

export const TopBarMenu = styled.ul`
  display: flex;
  gap: 1.5rem;
  color: #ffeeba;
  align-items: center;
  position: relative;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 14rem;
  background: #fff;
  color: #1f2937;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  border: none;
  z-index: 50;
  list-style: none;
  padding: 0.25rem 0;
`;

export const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: ${({ $border }) => ($border ? "1px solid #e5e7eb" : "none")};
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background-color: #fef2f2;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: 0.95rem;
  }
`;


/* Main Header */
export const MainHeader = styled.div`
  padding: 1.25rem 0;
  background: #dc2626;
  position: relative;
`;

export const MainHeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  img {
    height: 3.5rem;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

/* ---------------- Search ---------------- */
export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 900px;   // rộng hơn
  margin: 0 auto;

  @media (max-width: 768px) {
    display: none;
  }

  input {
    flex: 1;
    padding: 0.9rem 1.5rem;
    border: none;
    font-size: 1.125rem;
    outline: none;
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.08);
    border-radius: 30px 0 0 30px; // bo tròn trái
  }

  button {
    padding: 0 1.5rem;
    border: none;
    border-radius: 0 30px 30px 0; // bo tròn phải
    background: #fff;
    color: #b91c1c;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    font-size: 1.25rem;   // icon to hơn

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #fee2e2;
      color: #b91c1c;
      transform: scale(1.05);
    }
  }
`;


/* Icons wrapper */
export const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.75rem;
  align-items: center;

  @media(min-width: 768px){
    justify-content: flex-end;
  }

  div, a {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #f59e0b;
      transform: scale(1.15);
    }

    span {
      font-size: 0.75rem;
      text-align: center;
    }
  }
`;

/* Badge */
export const Badge = styled.span`
  position: absolute;
  top: -0.4rem;
  right: -0.4rem;
  width: 1.5rem;
  height: 1.5rem;
  background: #facc15;
  color: #000;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
`;

/* Chat Popup */
export const ChatPopup = styled.div`
  position: absolute;
  right: 1rem;
  bottom: -450px; /* hoặc tùy chỉnh */
  width: 300px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 100;
  animation: slideUp 0.3s ease forwards;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ChatHeader = styled.div`
  padding: 0.75rem 1rem;
  background: #dc2626;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px 16px 0 0;
`;

export const ChatBody = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  max-height: 200px;

  p {
    margin: 0;
  }
`;

export const ChatInput = styled.div`
  display: flex;
  border-top: 1px solid #e5e7eb;

  input {
    flex: 1;
    border: none;
    padding: 0.75rem 1rem;
    outline: none;
  }

  button {
    background: #dc2626;
    color: #fff;
    border: none;
    padding: 0 1rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #b91c1c;
    }
  }
`;


/* ---------------- NAV ---------------- */
export const NavWrapper = styled.nav`
  background: #ffffff;
  border-bottom: 1px solid #eaeaea;
  padding: 12px 20px;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 25px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  color: #555;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #f1c40f;
  }
`;

/* ---------------- FOOTER ---------------- */
export const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #1a1a1a, #111);
  color: #eee;
  padding: 40px 20px 20px 20px;
  margin-top: auto;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  margin-bottom: 20px;
`;

export const FooterCol = styled.div`
  h3 {
    color: #f1c40f;
    margin-bottom: 12px;
  }

  h4 {
    color: #fff;
    margin-bottom: 12px;
  }

  p {
    margin: 6px 0;
    font-size: 14px;
    color: #bbb;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FooterLink = styled.div`
  font-size: 14px;
  color: #ccc;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #f1c40f;
    text-decoration: underline;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const SocialIcon = styled.div`
  background: #222;
  color: #ccc;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #f1c40f;
    color: #111;
  }
`;

export const FooterBottom = styled.div`
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid #333;
  font-size: 14px;
  color: #888;
`;
