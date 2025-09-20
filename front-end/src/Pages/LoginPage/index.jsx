// src/components/LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/login", formData);
      

      // ✅ Save JWT token to localStorage
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to homepage after successful login
      navigate("/"); 

      setFormData({ email: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      {/* Header */}
      <header className="border-b border-border-light dark:border-border-dark px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 text-green-600 dark:text-green-600">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                  clipRule="evenodd"
                  d="M24 4.24264L43.7574 24L24 43.7574L4.24264 24L24 4.24264ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-green-600 dark:text-green-600">ECO Finds</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm font-medium hover:text-primary transition-colors">Home</button>
            <button className="text-sm font-medium hover:text-primary transition-colors">Shop</button>
            <button className="text-sm font-medium hover:text-primary transition-colors">About</button>
            <button className="text-sm font-medium hover:text-primary transition-colors">Contact</button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-primary font-medium hover:underline transition-colors text-sm">Login</button>
            <Link to="/signup">
              <button className="bg-primary/20 dark:bg-primary/30 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-background-light dark:bg-background-dark p-8 rounded-xl shadow-sm border border-border-light dark:border-border-dark">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight">Login</h2>
              <p className="text-subtle-light dark:text-subtle-dark mt-2">Access your ECO Finds account.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                <input
                  className="form-input w-full px-4 py-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                <input
                  className="form-input w-full px-4 py-3 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <button
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-bold text-base hover:opacity-90 transition-opacity mt-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-subtle-light dark:text-subtle-dark">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
