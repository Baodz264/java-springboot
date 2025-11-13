import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Container,
  Header,
  AddressList,
  AddressItem,
  AddressInfo,
  AddressActions,
  Button,
  DefaultBadge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormRow,
  FormLabel,
  FormInput,
} from "./style";
import AddressService from "../../../../services/addressService";
import { UserContext } from "../../../../contexts/UserContext";
import { useToast } from "../../../../contexts/ToastProvider";

const AddressTab = () => {
  const { user } = useContext(UserContext);
  const toast = useToast();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    district: "",
    ward: "",
    isDefault: false,
  });

  // ✅ Bọc fetchAddresses trong useCallback để tránh cảnh báo ESLint
  const fetchAddresses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await AddressService.getAll();
      const userAddresses = data.filter(
        (addr) => addr.user?.id === user.id || addr.userId === user.id
      );
      setAddresses(userAddresses);
    } catch (err) {
      console.error("Lỗi lấy địa chỉ:", err);
      toast.error("Không thể tải danh sách địa chỉ!");
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // ✅ Không còn cảnh báo vì fetchAddresses đã có dependency ổn định
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const openModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setFormData({ ...address });
    } else {
      setEditingAddress(null);
      setFormData({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        district: "",
        ward: "",
        isDefault: false,
      });
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) throw new Error("User chưa đăng nhập");

      if (editingAddress) {
        const updated = await AddressService.update(editingAddress.id, {
          ...formData,
          userId: user.id,
        });
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === updated.id ? updated : addr))
        );
        toast.success("Cập nhật địa chỉ thành công!");
      } else {
        const newAddr = await AddressService.create({
          ...formData,
          userId: user.id,
        });
        setAddresses((prev) => [...prev, newAddr]);
        toast.success("Thêm địa chỉ thành công!");
      }
      closeModal();
    } catch (err) {
      console.error("Lỗi lưu địa chỉ:", err);
      toast.error("Lưu địa chỉ thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;
    try {
      await AddressService.delete(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Xóa địa chỉ thành công!");
    } catch (err) {
      console.error("Lỗi xóa địa chỉ:", err);
      toast.error("Xóa địa chỉ thất bại!");
    }
  };

  if (loading) return <p>Đang tải địa chỉ...</p>;

  return (
    <Container>
      <Header>Quản lý địa chỉ</Header>
      <Button
        $variant="add"
        style={{ marginBottom: "20px" }}
        onClick={() => openModal()}
      >
        + Thêm địa chỉ mới
      </Button>

      {addresses.length === 0 && <p>Chưa có địa chỉ nào. Hãy thêm địa chỉ mới!</p>}

      <AddressList>
        {addresses.map((addr) => (
          <AddressItem key={addr.id}>
            <AddressInfo>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "600", fontSize: "16px" }}>
                  {addr.fullName}
                </p>
                {addr.isDefault && <DefaultBadge>Mặc định</DefaultBadge>}
              </div>
              <p>
                <b>SĐT:</b> {addr.phone}
              </p>

              <div style={{ marginTop: "6px", lineHeight: "1.6" }}>
                <p>
                  <b>Địa chỉ:</b> {addr.addressLine}
                </p>
                <p>
                  <b>Phường/Xã:</b> {addr.ward || "Chưa có"}
                </p>
                <p>
                  <b>Quận/Huyện:</b> {addr.district || "Chưa có"}
                </p>
                <p>
                  <b>Tỉnh/Thành phố:</b> {addr.city || "Chưa có"}
                </p>
              </div>
            </AddressInfo>

            <AddressActions>
              <Button $variant="edit" onClick={() => openModal(addr)}>
                Sửa
              </Button>
              <Button $variant="delete" onClick={() => handleDelete(addr.id)}>
                Xóa
              </Button>
            </AddressActions>
          </AddressItem>
        ))}
      </AddressList>

      {isModalOpen && (
        <Modal>
          <ModalHeader>
            {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            <button
              onClick={closeModal}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </ModalHeader>
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormRow>
                <FormLabel>Người nhận</FormLabel>
                <FormInput
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </FormRow>
              <FormRow>
                <FormLabel>SĐT</FormLabel>
                <FormInput
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912345678"
                  required
                />
              </FormRow>
              <FormRow>
                <FormLabel>Địa chỉ</FormLabel>
                <FormInput
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="Số nhà, đường"
                  required
                />
              </FormRow>
              <FormRow>
                <FormLabel>Phường/Xã</FormLabel>
                <FormInput
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Phường 1"
                />
              </FormRow>
              <FormRow>
                <FormLabel>Quận/Huyện</FormLabel>
                <FormInput
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Quận 1"
                />
              </FormRow>
              <FormRow>
                <FormLabel>Tỉnh/Thành phố</FormLabel>
                <FormInput
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="TP.HCM"
                />
              </FormRow>
              <FormRow style={{ alignItems: "center" }}>
                <FormLabel>Mặc định</FormLabel>
                <FormInput
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
              </FormRow>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">
                {editingAddress ? "Cập nhật" : "Thêm"}
              </Button>
              <Button type="button" $variant="cancel" onClick={closeModal}>
                Hủy
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Container>
  );
};

export default AddressTab;
