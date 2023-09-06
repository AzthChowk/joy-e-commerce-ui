import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../src/views/pages/home/HomePage";
import Login from "../src/views/pages/login/LoginPage";
import AllProducts from "./components/AllProducts";
import NewArrivals from "./components/NewArrivals";
import ViewProductDetails from "./components/ViewProductDetails";
import "./index.css";
import Index from "./routes";
import BuyerRoot from "./routes/buyer/buyer-root";
import BuyerDashboardIndex from "./routes/buyer/BuyerDashboardIndex";
import OrderedList from "./routes/buyer/OrderedList";
import ErrorPage from "./routes/error-page";
import SellerAddProduct from "./routes/seller/seller-add-product";
import SellerDashBoard from "./routes/seller/seller-root";
import SellerViewProduct from "./routes/seller/seller-view-products";
import HomeRoot from "./views/pages/home/HomeRoot";
import Mens from "./views/pages/home/Mens";
import Women from "./views/pages/home/Women";

//React Query
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import BuyerProductReviews from "./routes/buyer/BuyerProductReviews";

const queryClient = new QueryClient();

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
          {
            path: "/buyer",
            element: <BuyerRoot />,

            children: [
              {
                children: [
                  { index: true, element: <BuyerDashboardIndex /> },
                  {
                    path: "dashboard",
                    element: <BuyerDashboardIndex />,
                  },
                  {
                    path: "product/reviews",
                    element: <BuyerProductReviews />,
                  },
                  {
                    path: "details/:id",
                    element: <ViewProductDetails />,
                  },
                ],
              },
            ],
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
  {
    path: "/buyer",
    element: <BuyerRoot />,

    children: [
      {
        children: [
          { index: true, element: <BuyerDashboardIndex /> },
          {
            path: "dashboard",
            element: <BuyerDashboardIndex />,
          },
          {
            path: "product/reviews",
            element: <BuyerProductReviews />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
