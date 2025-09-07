import React, { useState } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import AuthCard from "../../components/AuthCard";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function getVerified(event) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:3000/signin", { name, email, password });
      setMessage({ type: "success", text: "Signup successful!" });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setMessage({ type: "error", text: error.response.data.message || "Signup failed" });
      } else {
        setMessage({ type: "error", text: "Server not reachable" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Sign Up">
        <form onSubmit={getVerified} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Username"
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-lg px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-2 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
