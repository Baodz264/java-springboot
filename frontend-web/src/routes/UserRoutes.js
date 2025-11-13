import UserLayout from "../layouts/UserLayout/index";
import NotFound from "../pages/error/NotFound";
import Forbidden from "../pages/error/Forbidden";
import Home from "../pages/user/Home/HomePage";
import ProductDetail from "../pages/user/Product/ProductDetail/ProductDetail";
import CartPage from "../pages/user/Cart/Cart";
import CheckoutPage from "../pages/user/Checkout/CheckoutPage";
import Profile from "../pages/user/Profile/Profile";

import Product from "../pages/user/Product/ProductList/ProductList";
import Chat from "../pages/user/Chat/Chat"; // bật khi có ChatPage
import VnPayReturn from "../pages/user/VNPayReturn/VNPayReturn";





const UserRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    { path: "", element: <Home /> }, // Trang chủ
    { path: "products", element: <Product /> },
    { path: "product-detail", element: <ProductDetail /> },
    { path: "product/:id", element: <ProductDetail /> }, // Chi tiết sản phẩm
    { path: "cart", element: <CartPage /> }, // 🛒 Trang giỏ hàng
    { path: "checkout", element: <CheckoutPage /> }, // ⚡ Trang thanh toán
    { path: "profile", element: <Profile /> }, // 👤 Trang thông tin người dùng
 
    { path: "chat", element: <Chat /> },                   // Chat (khi sẵn sàng)
    { path: "/payment/vnpay-return", element: <VnPayReturn /> },
    { path: "403", element: <Forbidden /> },
    { path: "*", element: <NotFound /> },
    
  ],
};

export default UserRoutes;
