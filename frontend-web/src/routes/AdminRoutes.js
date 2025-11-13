import React from "react";
import AdminLayout from "../layouts/AdminLayout/index";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import NotFound from "../pages/error/NotFound";
import Forbidden from "../pages/error/Forbidden";

// Banner
import {
  BannerAdd,
  BannerEdit,
  BannerView,
  BannerList,
} from "../pages/admin/Banners";

// Category
import {
  CategoryList,
  CategoryAdd,
  CategoryEdit,
  CategoryView,
} from "../pages/admin/Categories";

// Users
import { UserList, UserAdd, UserEdit, UserView } from "../pages/admin/Users";

// Reviews
import {
  ReviewList,
  ReviewAdd,
  ReviewEdit,
  ReviewView,
} from "../pages/admin/Reviews/index";

// Addresses
import {
  AddressList,
  AddressAdd,
  AddressEdit,
  AddressView,
} from "../pages/admin/Addresses";

// Vouchers
import {
  VoucherList,
  VoucherAdd,
  VoucherEdit,
  VoucherView,
} from "../pages/admin/Vouchers";

// Payments
import {
  PaymentList,
  PaymentAdd,
  PaymentEdit,
  PaymentView,
} from "../pages/admin/Payments";

// Shippings
import {
  ShippingList,
  ShippingAdd,
  ShippingEdit,
  ShippingView,
} from "../pages/admin/Shippings";

// Orders
import {
  OrderList,
  OrderAdd,
  OrderEdit,
  OrderView,
} from "../pages/admin/Orders";

// Brands
import {
  BrandList,
  BrandAdd,
  BrandEdit,
  BrandView,
} from "../pages/admin/Brands";

// Products
import {
  ProductList,
  ProductAdd,
  ProductEdit,
  ProductView,
} from "../pages/admin/Products";

// Chats
import { ChatPage } from "../pages/admin/Chats";

const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    // Dashboard
    { path: "dashboard", element: <Dashboard /> },

    // Banner
    { path: "banners", element: <BannerList /> },
    { path: "banners/add", element: <BannerAdd /> },
    { path: "banners/edit/:id", element: <BannerEdit /> },
    { path: "banners/view/:id", element: <BannerView /> },

    // Categories
    { path: "categories", element: <CategoryList /> },
    { path: "categories/add", element: <CategoryAdd /> },
    { path: "categories/edit/:id", element: <CategoryEdit /> },
    { path: "categories/view/:id", element: <CategoryView /> },

    // Users
    { path: "users", element: <UserList /> },
    { path: "users/add", element: <UserAdd /> },
    { path: "users/edit/:id", element: <UserEdit /> },
    { path: "users/view/:id", element: <UserView /> },

    // Reviews
    { path: "reviews", element: <ReviewList /> },
    { path: "reviews/add", element: <ReviewAdd /> },
    { path: "reviews/edit/:id", element: <ReviewEdit /> },
    { path: "reviews/view/:id", element: <ReviewView /> },

    // Addresses
    { path: "addresses", element: <AddressList /> },
    { path: "addresses/add", element: <AddressAdd /> },
    { path: "addresses/edit/:id", element: <AddressEdit /> },
    { path: "addresses/view/:id", element: <AddressView /> },

    // Vouchers
    { path: "vouchers", element: <VoucherList /> },
    { path: "vouchers/add", element: <VoucherAdd /> },
    { path: "vouchers/edit/:id", element: <VoucherEdit /> },
    { path: "vouchers/view/:id", element: <VoucherView /> },

    // Payments
    { path: "payments", element: <PaymentList /> },
    { path: "payments/add", element: <PaymentAdd /> },
    { path: "payments/edit/:id", element: <PaymentEdit /> },
    { path: "payments/view/:id", element: <PaymentView /> },

    // Shippings
    { path: "shippings", element: <ShippingList /> },
    { path: "shippings/add", element: <ShippingAdd /> },
    { path: "shippings/edit/:id", element: <ShippingEdit /> },
    { path: "shippings/view/:id", element: <ShippingView /> },

    // Orders
    { path: "orders", element: <OrderList /> },
    { path: "orders/add", element: <OrderAdd /> },
    { path: "orders/edit/:id", element: <OrderEdit /> },
    { path: "orders/view/:id", element: <OrderView /> },

    // Brands
    { path: "brands", element: <BrandList /> },
    { path: "brands/add", element: <BrandAdd /> },
    { path: "brands/edit/:id", element: <BrandEdit /> },
    { path: "brands/view/:id", element: <BrandView /> },

    // Products
    { path: "products", element: <ProductList /> },
    { path: "products/add", element: <ProductAdd /> },
    { path: "products/edit/:id", element: <ProductEdit /> },
    { path: "products/view/:id", element: <ProductView /> },

    // Product Images (tab trong ProductView)
    { path: "products/view/:id/images", element: <ProductView /> },

    // Product Variants (tab trong ProductView)
    { path: "products/view/:id/variants", element: <ProductView /> },

    // Chats
    { path: "chats", element: <ChatPage /> }, // ChatPage hiển thị danh sách user + chat window

    // Error pages
    { path: "403", element: <Forbidden /> },
    { path: "*", element: <NotFound /> },
  ],
};

export default AdminRoutes;
