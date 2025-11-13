import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { ImageTableWrapper } from "./style";
import ProductImageService from "../../../../../services/productImageService";
import { useToast } from "../../../../../contexts/ToastProvider";

const ImageTable = ({ images, productId, refresh }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const toast = useToast();

  const handleEdit = (image) => {
    setEditImage(image);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditImage(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ảnh này?")) {
      try {
        await ProductImageService.delete(id);
        refresh();
        toast.success("Xóa ảnh thành công!");
      } catch (err) {
        console.error(err);
        toast.error("Xóa thất bại!");
      }
    }
  };

  return (
    <ImageTableWrapper>
      <button className="add-button" onClick={handleAdd}>
        Thêm ảnh phụ
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img) => (
            <tr key={img.id}>
              <td>{img.id}</td>
              <td>
                {img.imageUrl ? (
                  <img
                    src={img.imageUrl}
                    alt="Sản phẩm"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      backgroundColor: "#f0f0f0",
                    }}
                    onError={(e) => (e.target.src = "/images/default-product.png")}
                  />
                ) : (
                  "Chưa có ảnh"
                )}
              </td>
              <td>
                <button className="edit" onClick={() => handleEdit(img)}>
                  Sửa
                </button>
                <button className="delete" onClick={() => handleDelete(img.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageData={editImage}
        productId={productId}
        refresh={refresh}
      />
    </ImageTableWrapper>
  );
};

export default ImageTable;
