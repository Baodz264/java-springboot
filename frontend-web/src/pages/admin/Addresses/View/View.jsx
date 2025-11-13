import React, { useEffect, useState } from "react";
import { Container } from "./style";
import AddressService from "../../../../services/addressService";
import UserService from "../../../../services/userService";
import { useParams } from "react-router-dom";

const AddressView = () => {
  const { id } = useParams();
  const [address, setAddress] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const data = await AddressService.getById(id);
        setAddress(data);

        if (data.userId) {
          const user = await UserService.getById(data.userId);
          setUserName(user.fullName);
        }
      } catch (err) {
        console.error("Lỗi load address:", err);
      }
    };
    fetchAddress();
  }, [id]);

  if (!address) return <Container>Đang tải...</Container>;

  return (
    <Container>
      <h2>Chi tiết địa chỉ</h2>
      <div className="card">
        <p><b>ID:</b> {address.id}</p>
        <p><b>Full Name:</b> {address.fullName}</p>
        <p><b>Phone:</b> {address.phone}</p>
        <p><b>Address:</b> {address.addressLine}</p>
        <p><b>City:</b> {address.city}</p>
        <p><b>District:</b> {address.district}</p>
        <p><b>Ward:</b> {address.ward}</p>
        <p><b>Default:</b> {address.isDefault ? "Yes" : "No"}</p>
        <p><b>User:</b> {userName || "N/A"}</p>
      </div>
    </Container>
  );
};

export default AddressView;
