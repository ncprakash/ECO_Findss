// src/layouts/AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex flex-col items-center gap-6 w-full max-w-md px-6">
        {/* App Logo */}
        <img src="../public/images.jpg" alt="EcoFinds" className="w-20 h-20" />

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
