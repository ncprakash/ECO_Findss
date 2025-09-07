// src/pages/Login.jsx
import React from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/AuthCard";
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <>
    <AuthLayout>
      <AuthCard title="Login">
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Login
          </button>
        </form>
        <p className="text-center text-lg mt-2 text-green-600">
  Don’t have an account?{" "}
  <Link to="/auth/signup" className="text-green-600 font-semibold">
    Sign Up
  </Link>
</p>
      </AuthCard>
    </AuthLayout>
    </>
  );
};

export default Login;
