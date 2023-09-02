import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Index from "./routes";
import SellerAddProduct from "./routes/seller/seller-add-product";
import SellerViewProduct from "./routes/seller/seller-view-products";
import SellerDashBoard from "./routes/seller/seller-root";
import ErrorPage from "./routes/error-page";
import HomePage from "../src/views/pages/home/HomePage";
import Login from "../src/views/pages/login/LoginPage";
import HomeRoot from "./views/pages/home/HomeRoot";
import Mens from "./views/pages/home/Mens";
import Women from "./views/pages/home/Women";
import ViewProductDetails from "./components/ViewProductDetails";
import NewArrivals from "./components/NewArrivals";
import AllProducts from "./components/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "allproducts",
            element: <AllProducts />,
          },
          {
            path: "newarrivals",
            element: <NewArrivals />,
          },
          {
            path: "mens",
            element: <Mens />,
          },
          {
            path: "womens",
            element: <Women />,
          },
          {
            path: "product/details/:id",
            element: <ViewProductDetails />,
          },
          {
            path: "allproducts/product/details/:id",
            element: <ViewProductDetails />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerDashBoard />,

    children: [
      {
        children: [
          { index: true, element: <Index /> },
          {
            path: "product/add",
            element: <SellerAddProduct />,
          },
          {
            path: "products",
            element: <SellerViewProduct />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
