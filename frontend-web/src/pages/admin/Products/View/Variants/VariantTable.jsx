import React, { useState } from "react";
import ProductVariantService from "../../../../../services/productVariantService";
import VariantModal from "./VariantModal";
import { VariantTableWrapper, ActionButton } from "./style";
import { useToast } from "../../../../../contexts/ToastProvider";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const VariantTable = ({ variants, productId, refresh }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editVariant, setEditVariant] = useState(null);
  const toast = useToast();

  const handleEdit = (variant) => {
    setEditVariant(variant);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditVariant(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa biến thể này?")) {
      try {
        await ProductVariantService.delete(id);
        toast.success("Xóa biến thể thành công");
        refresh();
      } catch (error) {
        console.error("Lỗi xóa biến thể:", error);
        toast.error("Xóa biến thể thất bại!");
      }
    }
  };

  return (
    <VariantTableWrapper>
      <button className="add-variant" onClick={handleAdd}>Thêm biến thể</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Size</th>
            <th>Màu sắc</th>
            <th>Giá thêm</th>
            <th>Tồn kho</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.size}</td>
              <td>{v.color}</td>
              <td>{v.extraPrice}</td>
              <td style={{ color: v.stock > 0 ? "#27ae60" : "#c0392b" }}>{v.stock}</td>
              <td>
                {v.imageUrl && (
                  <img
                    src={v.imageUrl.startsWith("http") ? v.imageUrl : `${API_BASE_URL}${v.imageUrl}`}
                    alt="Biến thể"
                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
                  />
                )}
              </td>
              <td>
                <ActionButton $bg="#3498db" onClick={() => handleEdit(v)}>Sửa</ActionButton>
                <ActionButton $bg="#e74c3c" onClick={() => handleDelete(v.id)}>Xóa</ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <VariantModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        variantData={editVariant}
        productId={productId}
        refresh={refresh}
      />
    </VariantTableWrapper>
  );
};

export default VariantTable;
