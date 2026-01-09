import { createBrowserRouter } from "react-router"; // ✅ must be react-router-dom

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import Login from "../auth/Login";
import Register from "../auth/Register";

import AddListing from "../listings/AddListing";
import PetsSupplies from "../listings/PetsSupplies";
import ListingDetails from "../listings/ListingDetails";
import CategoryFiltered from "../listings/CategoryFiltered";

import MyListings from "../dashboard/MyListings";
import MyOrders from "../dashboard/MyOrders";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> },          // default route for "/"
      { path: "pets", element: <PetsSupplies /> },
      { path: "listing/:id", element: <ListingDetails /> },
      { path: "category/:category", element: <CategoryFiltered /> },
      {
        path: "add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "my-listings", element: <MyListings /> },
      { path: "my-orders", element: <MyOrders /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
