import React from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRouter = () => {
  let elements = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Dashboard />
        }
      ]
    },
    { path: "/login", element: <Login /> }
  ]);
  return elements;
};

export default AppRouter;
