import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage";
import AllProducts from "../Pages/AllProducts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details";
import MyExport from "../Pages/MyExport";
import AddProduct from "../Pages/AddProduct";
import MyImport from "../Pages/MyImport";
import ViewDetails from "../Pages/ViewDetails";
import ErrorPage from "../Pages/ErrorPage";
import Loading from "../Components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Loading />,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/myexport",
        element: (
          <PrivateRoute>
            <MyExport />
          </PrivateRoute>
        ),
      },
      {
        path: "/myImport",
        element: (
          <PrivateRoute>
            <MyImport />
          </PrivateRoute>
        ),
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/viewDetails/:id",
        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `https://global-link-hub.vercel.app/importedProducts/${params.id}`
            );
            if (!res.ok) {
              throw new Error("Failed to fetch product data");
            }
            const data = await res.json();
            return data;
          } catch (error) {
            throw new Response("Server Offline or Fetch Failed", {
              status: 500,
              statusText: error.message,
            });
          }
        },
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",

        loader: async ({ params }) => {
          try {
            const res = await fetch(
              `https://global-link-hub.vercel.app/products/${params.id}`
            );
            if (!res.ok) {
              throw new Error("Failed to fetch product data");
            }
            const data = await res.json();
            return data;
          } catch (error) {
            throw new Response("Server Offline or Fetch Failed", {
              status: 500,
              statusText: error.message,
            });
          }
        },

        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
