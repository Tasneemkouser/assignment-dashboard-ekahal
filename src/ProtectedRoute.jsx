import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./providers/FirebaseAuthProvider";

export const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useAuth();
  console.log(user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
