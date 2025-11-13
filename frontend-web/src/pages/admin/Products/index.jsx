// src/pages/admin/Products/index.jsx

export { default as ProductList } from './List/List.jsx';
export { default as ProductAdd } from './Add/Add.jsx';
export { default as ProductEdit } from './Edit/Edit.jsx';
export { default as ProductView } from './View/View.jsx';

// Optional: Export các component con nếu cần dùng ở ngoài
export { default as ProductImageTable } from './View/Images/ImageTable.jsx';
export { default as ProductImageModal } from './View/Images/ImageModal.jsx';
export { default as ProductVariantTable } from './View/Variants/VariantTable.jsx';
export { default as ProductVariantModal } from './View/Variants/VariantModal.jsx';
