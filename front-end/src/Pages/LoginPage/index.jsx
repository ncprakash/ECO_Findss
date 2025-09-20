// src/pages/Login.jsx
import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/AuthCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");

    try {
      const res = await axios.post("/api/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user.id); 
      toast.success("✅ Login successful!", { id: loadingToast });
      navigate("/user-dashboard"); // redirect after login
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Login failed", {
        id: loadingToast,
      });
    }
  };

  return (
    <AuthLayout>
      <AuthCard title="Login">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <button
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center text-lg mt-2 text-green-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
