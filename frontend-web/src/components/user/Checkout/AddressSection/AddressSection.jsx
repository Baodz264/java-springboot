import React, { useState, useEffect, useCallback } from "react";
import {
  AddressContainer,
  AddressInfo,
  ChangeAddressButton,
  AddressList,
  AddressItem,
  DefaultBadge,
  ActionButtons,
  Button,
  Overlay,
  Modal,
  ModalTitle,
  FormContainer,
  Input,
  CheckboxRow,
  ModalActions,
} from "./style";
import AddressService from "../../../../services/addressService";
import { useToast } from "../../../../contexts/ToastProvider";

export default function AddressSection({ user, onSelectAddress }) {
  const toast = useToast();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    ward: "",
    district: "",
    city: "",
    isDefault: false,
  });

  // --- Lấy danh sách địa chỉ ---
  const fetchAddresses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await AddressService.getAll();
      const userAddresses = data.filter(
        (addr) => addr.user?.id === user.id || addr.userId === user.id
      );
      setAddresses(userAddresses);
      const defaultAddr = userAddresses.find((addr) => addr.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
        onSelectAddress && onSelectAddress(defaultAddr);
      }
    } catch (err) {
      console.error("Lỗi lấy địa chỉ:", err);
      toast.error("Không thể tải địa chỉ!");
    } finally {
      setLoading(false);
    }
  }, [user, toast, onSelectAddress]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // --- Chọn địa chỉ ---
  const handleSelect = (addr) => {
    setSelectedAddressId(addr.id);
    onSelectAddress && onSelectAddress(addr);
  };

  // --- Mở modal thêm ---
  const handleAdd = () => {
    setEditingAddress(null);
    setForm({
      fullName: user?.name || "",
      phone: user?.phone || "",
      addressLine: "",
      ward: "",
      district: "",
      city: "",
      isDefault: false,
    });
    setShowModal(true);
  };

  // --- Mở modal sửa ---
  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setForm({
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      ward: addr.ward,
      district: addr.district,
      city: addr.city,
      isDefault: addr.isDefault,
    });
    setShowModal(true);
  };

  // --- Lưu địa chỉ ---
  const handleSave = async () => {
    try {
      if (!form.fullName || !form.phone || !form.addressLine) {
        toast.warning("Vui lòng nhập đầy đủ thông tin địa chỉ");
        return;
      }

      if (editingAddress) {
        await AddressService.update(editingAddress.id, form);
        toast.success("Cập nhật địa chỉ thành công!");
      } else {
        await AddressService.create({
          ...form,
          userId: user.id,
        });
        toast.success("Thêm địa chỉ mới thành công!");
      }
      setShowModal(false);
      fetchAddresses();
    } catch (err) {
      console.error("Lỗi lưu địa chỉ:", err);
      toast.error("Không thể lưu địa chỉ!");
    }
  };

  if (loading) return <AddressContainer>Đang tải địa chỉ...</AddressContainer>;
  if (!user)
    return (
      <AddressContainer>Vui lòng đăng nhập để xem địa chỉ</AddressContainer>
    );

  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || addresses[0];

  return (
    <AddressContainer>
      {/* Header có nút thêm ở góc phải */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <h3>Quản lý địa chỉ</h3>
        <Button onClick={handleAdd}>+ Thêm địa chỉ mới</Button>
      </div>

      {/* --- Hiển thị địa chỉ đang chọn --- */}
      {selectedAddress ? (
        <>
          <AddressInfo>
            <div>
              <strong>{selectedAddress?.fullName}</strong>
            </div>
            <div>SĐT: {selectedAddress?.phone}</div>
            <div>Địa chỉ: {selectedAddress?.addressLine}</div>
            <div>
              Phường/Xã: {selectedAddress?.ward}, Quận/Huyện:{" "}
              {selectedAddress?.district}, Tỉnh/Thành phố:{" "}
              {selectedAddress?.city}
            </div>
            {selectedAddress?.isDefault && (
              <DefaultBadge>Mặc định</DefaultBadge>
            )}
          </AddressInfo>

          <ChangeAddressButton>
            Chọn địa chỉ khác
            <AddressList>
              {addresses.map((addr) => (
                <AddressItem
                  key={addr.id}
                  selected={addr.id === selectedAddressId}
                  onClick={() => handleSelect(addr)}
                >
                  <div>
                    {addr.fullName} - {addr.addressLine}
                    {addr.isDefault && <DefaultBadge>Mặc định</DefaultBadge>}
                  </div>
                  <ActionButtons>
                    <Button
                      $variant="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(addr);
                      }}
                    >
                      Sửa
                    </Button>
                  </ActionButtons>
                </AddressItem>
              ))}
            </AddressList>
          </ChangeAddressButton>
        </>
      ) : (
        <div>Chưa có địa chỉ nào, hãy thêm mới!</div>
      )}

      {/* --- Modal thêm/sửa địa chỉ --- */}
      {showModal && (
        <Overlay>
          <Modal>
            <ModalTitle>
              {editingAddress ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            </ModalTitle>

            <FormContainer>
              <Input
                type="text"
                placeholder="Họ và tên"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Địa chỉ chi tiết"
                value={form.addressLine}
                onChange={(e) =>
                  setForm({ ...form, addressLine: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="Phường/Xã"
                value={form.ward}
                onChange={(e) => setForm({ ...form, ward: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Quận/Huyện"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Tỉnh/Thành phố"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <CheckboxRow>
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm({ ...form, isDefault: e.target.checked })
                  }
                />
                Đặt làm mặc định
              </CheckboxRow>
            </FormContainer>

            <ModalActions>
              <Button $variant="cancel" onClick={() => setShowModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleSave}>Lưu</Button>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </AddressContainer>
  );
}
