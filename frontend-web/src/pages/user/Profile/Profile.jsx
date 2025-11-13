import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  LeftPanel,
  AvatarWrapper,
  Avatar,
  VerifiedBadge,
  UserName,
  UserEmail,
  CenterPanel,
  RightPanel,
  MenuList,
  MenuItem
} from "./style";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import AddressTab from "./AddressTab/AddressTab";
import ChangePasswordTab from "./ChangePasswordTab/ChangePasswordTab";
import OrdersTab from "./OrdersTab/OrdersTab";
import VouchersTab from "./VouchersTab/VouchersTab";

import UserService from "../../../services/userService";
import { UserContext } from "../../../contexts/UserContext";

function Profile() {
  const { user: contextUser } = useContext(UserContext); // lấy user từ context
  const [user, setUser] = useState(contextUser || null);
  const [activeTab, setActiveTab] = useState("Hồ sơ");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (contextUser) {
          setUser(contextUser);
          return;
        }

        // Bỏ cảnh báo nếu không có userId
        const userId = localStorage.getItem("userId") || null;
        if (!userId) {
          // Không log cảnh báo nữa, chỉ fallback
          setUser(null);
          return;
        }

        const currentUser = await UserService.getById(userId);
        setUser(currentUser);
      } catch (err) {
        console.error("Không lấy được user:", err);
      }
    };

    fetchUser();
  }, [contextUser]);

  const renderTab = () => {
    if (!user) return <p>Đang tải...</p>;

    switch (activeTab) {
      case "Hồ sơ":
        return <ProfileInfo user={user} setUser={setUser} />;
      case "Địa chỉ":
        return <AddressTab />;
      case "Đổi mật khẩu":
        return <ChangePasswordTab />;
      case "Đơn mua":
        return <OrdersTab />;
      case "Kho voucher":
        return <VouchersTab />;
      default:
        return <ProfileInfo user={user} setUser={setUser} />;
    }
  };

  if (!user) return <p>Đang tải...</p>;

  return (
    <Container>
      <LeftPanel>
        <AvatarWrapper>
          <Avatar
            src={
              user.avatarUrl
                ? `${process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"}${user.avatarUrl}`
                : "/default-avatar.png"
            }
            alt={user.fullName}
          />
        </AvatarWrapper>
        <UserName>{user.fullName}</UserName>
        <UserEmail>
          {user.email} {user.status && <VerifiedBadge>Xác thực</VerifiedBadge>}
        </UserEmail>
      </LeftPanel>

      <CenterPanel>{renderTab()}</CenterPanel>

      <RightPanel>
        <MenuList>
          {["Hồ sơ", "Địa chỉ", "Đổi mật khẩu", "Đơn mua", "Kho voucher"].map((tab) => (
            <MenuItem
              key={tab}
              $active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </MenuItem>
          ))}
        </MenuList>
      </RightPanel>
    </Container>
  );
}

export default Profile;
