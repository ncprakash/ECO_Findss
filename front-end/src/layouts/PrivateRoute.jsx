// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
export default function PrivateRoute({ children }) {
  const Auth = localStorage.getItem("token");
  if (!Auth) return <Navigate to="/login" />;

  return <MainLayout>{children}</MainLayout>; // Wrap all private pages
}
