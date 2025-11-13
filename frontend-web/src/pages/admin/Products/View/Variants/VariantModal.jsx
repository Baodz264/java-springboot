import React, { useState, useEffect } from "react";
import ProductVariantService from "../../../../../services/productVariantService";
import { ModalBackdrop, ModalContent, FormGroup, Button } from "./style";
import { useToast } from "../../../../../contexts/ToastProvider";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Các lựa chọn sẵn cho size và color
const SIZE_OPTIONS = ["S", "M", "L", "XL", "XXL"];
const COLOR_OPTIONS = ["Đỏ", "Xanh dương", "Xanh lá", "Đen", "Trắng", "Vàng"];

const VariantModal = ({ isOpen, onClose, variantData, productId, refresh }) => {
  const [variant, setVariant] = useState({
    size: SIZE_OPTIONS[0],
    color: COLOR_OPTIONS[0],
    extraPrice: 0,
    stock: 0,
    imageUrl: ""
  });
  const [file, setFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (variantData) setVariant({ ...variantData });
    else setVariant({ size: SIZE_OPTIONS[0], color: COLOR_OPTIONS[0], extraPrice: 0, stock: 0, imageUrl: "" });
    setFile(null);
  }, [variantData]);

  const handleChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...variant, productId };
      if (variant.id) {
        await ProductVariantService.update(variant.id, payload, file);
        toast.success("Cập nhật biến thể thành công");
      } else {
        await ProductVariantService.create(payload, file);
        toast.success("Thêm biến thể thành công");
      }
      refresh();
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu biến thể:", error);
      toast.error("Có lỗi xảy ra khi lưu biến thể!");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <h3>{variant.id ? "Sửa biến thể" : "Thêm biến thể"}</h3>
        <form onSubmit={handleSubmit}>
          {/* Size */}
          <FormGroup>
            <label>Size</label>
            <select name="size" value={variant.size} onChange={handleChange} required>
              {SIZE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </FormGroup>

          {/* Color */}
          <FormGroup>
            <label>Màu sắc</label>
            <select name="color" value={variant.color} onChange={handleChange} required>
              {COLOR_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormGroup>

          {/* Extra Price */}
          <FormGroup>
            <label>Giá thêm</label>
            <input name="extraPrice" type="number" value={variant.extraPrice} onChange={handleChange} />
          </FormGroup>

          {/* Stock */}
          <FormGroup>
            <label>Tồn kho</label>
            <input name="stock" type="number" value={variant.stock} onChange={handleChange} required />
          </FormGroup>

          {/* URL ảnh */}
          <FormGroup>
            <label>URL ảnh (nếu không upload)</label>
            <input name="imageUrl" value={variant.imageUrl} onChange={handleChange} />
          </FormGroup>

          {/* Upload file */}
          <FormGroup>
            <label>Upload ảnh</label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </FormGroup>

          {/* Preview */}
          {(variant.imageUrl || file) && (
            <img
              src={file ? URL.createObjectURL(file) : variant.imageUrl.startsWith("http") ? variant.imageUrl : `${API_BASE_URL}${variant.imageUrl}`}
              alt="Xem trước"
              style={{ width: 120, marginBottom: 10, borderRadius: 6 }}
            />
          )}

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button type="submit" $bg="#2ecc71">{variant.id ? "Cập nhật" : "Thêm"}</Button>
            <Button type="button" $bg="#e74c3c" onClick={onClose}>Hủy</Button>
          </div>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default VariantModal;
