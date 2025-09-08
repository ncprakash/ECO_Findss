import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
    bio: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const loadingToast = toast.loading("Signing you up...")
  
    try {
      await axios.post("/api/signup", formData)
  
      toast.success("✅ Signup successful!", {
        id: loadingToast, // replaces loading toast
      })
  
      navigate("/verify")
    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Signup failed", {
        id: loadingToast,
      })
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={formData.postal_code}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Sign Up ✅
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
