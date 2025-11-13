import React, { useState, useEffect } from "react";
import { ModalBackdrop, ModalContent } from "./style";
import ProductImageService from "../../../../../services/productImageService";
import { useToast } from "../../../../../contexts/ToastProvider";

const ImageModal = ({ isOpen, onClose, imageData, productId, refresh }) => {
  const [image, setImage] = useState({ imageUrl: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (imageData) {
      setImage(imageData);
      setPreview(imageData.imageUrl || "/images/default-product.png");
    } else {
      setImage({ imageUrl: "" });
      setPreview("/images/default-product.png");
    }
    setFile(null);
  }, [imageData]);

  const handleChange = (e) => {
    setImage({ ...image, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...image, productId };
      if (image.id) {
        await ProductImageService.update(image.id, payload, file);
        toast.success("Cập nhật ảnh thành công!");
      } else {
        await ProductImageService.create(payload, file);
        toast.success("Thêm ảnh thành công!");
      }
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Lưu ảnh thất bại!");
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <h3>{image.id ? "Sửa ảnh phụ" : "Thêm ảnh phụ"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="imageUrl"
            placeholder="URL ảnh"
            value={image.imageUrl}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="Xem trước"
              className="preview"
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }}
            />
          )}
          <div className="btn-group" style={{ marginTop: "15px" }}>
            <button type="submit" className="submit">
              {image.id ? "Cập nhật" : "Thêm"}
            </button>
            <button type="button" className="cancel" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default ImageModal;
