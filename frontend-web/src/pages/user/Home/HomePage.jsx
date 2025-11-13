import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../../../components/user/Home/Slider/Slider";
import CategoryList from "../../../components/user/Home/CategoryList/CategoryList";
import ProductNew from "../../../components/user/Home/ProductNew/ProductNew";
import ProductSale from "../../../components/user/Home/ProductSale/ProductSale";
import ProductService from "../../../services/productService";
import { SearchWrapper } from "./style"; // ✅ Import style riêng

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleSearchEvent = async (e) => {
      const key = e.detail.trim();
      setKeyword(key);

      if (!key) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        // ✅ Gọi API tìm kiếm sản phẩm
        const res = await ProductService.search({ keyword: key });

        const baseUrl =
          process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

        // ✅ Chuẩn hóa dữ liệu sản phẩm
        const list = res.map((p) => {
          // Xác định có sale hay không
          const hasSale = p.specialPrice && p.specialPrice < p.price;

          // Nếu có sale, tính phần trăm giảm
          const discount = hasSale
            ? Math.round(((p.price - p.specialPrice) / p.price) * 100)
            : 0;

          // Giá hiển thị
          const salePrice = hasSale ? p.specialPrice : p.price;

          // ✅ Lấy ảnh sản phẩm (ưu tiên ảnh đầu tiên hoặc thumbnail)
          const imageUrl =
            p.images?.length > 0
              ? p.images[0].imageUrl.startsWith("http")
                ? p.images[0].imageUrl
                : `${baseUrl}${
                    p.images[0].imageUrl.startsWith("/") ? "" : "/"
                  }${p.images[0].imageUrl}`
              : p.thumbnailUrl
              ? p.thumbnailUrl.startsWith("http")
                ? p.thumbnailUrl
                : `${baseUrl}${
                    p.thumbnailUrl.startsWith("/") ? "" : "/"
                  }${p.thumbnailUrl}`
              : "/images/default-product.png";

          return { ...p, hasSale, discount, salePrice, imageUrl };
        });

        setResults(list);
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Lắng nghe sự kiện tìm kiếm từ thanh search
    window.addEventListener("searchKeyword", handleSearchEvent);
    return () => window.removeEventListener("searchKeyword", handleSearchEvent);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {keyword ? (
        <SearchWrapper>
          <h2>Kết quả tìm kiếm cho: “{keyword}”</h2>

          {isSearching ? (
            <p className="loading">🔎 Đang tìm kiếm...</p>
          ) : results.length > 0 ? (
            <div className="grid-result">
              {results.map((product) => (
                <div
                  key={product.productId || product.id}
                  className="product-card relative"
                >
                  {/* Hiển thị badge giảm giá nếu có */}
                  {product.hasSale && (
                    <span className="discount-badge">-{product.discount}%</span>
                  )}

                  <div className="image-box">
                    <img
                      src={product.imageUrl}
                      alt={product.productName || product.name}
                    />
                  </div>

                  <div className="info">
                    <h3>{product.productName || product.name}</h3>

                    {/* Hiển thị giá tùy theo có sale hay không */}
                    <div className="price-box">
                      {product.hasSale ? (
                        <>
                          <span className="sale">
                            {product.salePrice.toLocaleString("vi-VN")}₫
                          </span>
                          <span className="old">
                            {product.price.toLocaleString("vi-VN")}₫
                          </span>
                        </>
                      ) : (
                        <span className="normal">
                          {product.price.toLocaleString("vi-VN")}₫
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="button-group">
                    <button
                      onClick={() =>
                        navigate(`/product/${product.productId || product.id}`)
                      }
                      className="btn-detail"
                    >
                      Chi tiết
                    </button>
                    <button className="btn-buy">Mua ngay</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="not-found">Không tìm thấy sản phẩm phù hợp.</p>
          )}
        </SearchWrapper>
      ) : (
        <>
          {/* Giao diện trang chủ mặc định */}
          <section className="py-4">
            <Slider />
          </section>

          <section className="py-6 bg-white">
            <CategoryList />
          </section>

          <section className="py-6">
            <ProductNew />
          </section>

          <section className="py-6 bg-white">
            <ProductSale />
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
