// src/components/SignupForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Signup = () => {
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
    let { name, value } = e.target;

    // Validation for specific fields
    if (name === "phone") value = value.replace(/\D/g, ""); // numbers only
    if (name === "postal_code") value = value.replace(/\D/g, ""); // numbers only
    if (name === "dob") value = value.slice(0, 10); // enforce YYYY-MM-DD

    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Save all signup data in localStorage
      localStorage.setItem("signupData", JSON.stringify(formData));

      // ✅ Send only email to backend
      await axios.post("/api/send-otp", { email: formData.email });

      // ✅ Redirect to verify with email param
      navigate(`/verify?email=${formData.email}`);
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.error || "Signup failed, please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
        <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-black-600 dark:text-black-400">
                {step === 1
                  ? "Create your account"
                  : step === 2
                  ? "Tell us about yourself"
                  : "Almost there!!!"}
              </h2>
              <p className="mt-2 text-sm text-black-600/70 dark:text-black-400/70">
                {step === 1
                  ? "Start your journey with us."
                  : step === 2
                  ? "Let's get your profile set up."
                  : "Please provide your address details."}
              </p>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    {i > 1 && <div className="w-16 h-1 bg-green-500/30"></div>}
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        step >= i
                          ? "bg-green-500 text-white"
                          : "bg-green-500/30 text-green-500"
                      }`}
                    >
                      {i}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 bg-background-light dark:bg-background-dark/50 p-8 rounded-xl shadow-lg"
            >
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  {["username", "email", "password"].map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium text-black-600/80 dark:text-black-400/80">
                        {field === "username"
                          ? "Username"
                          : field === "email"
                          ? "Email address"
                          : "Password"}
                      </label>
                      <input
                        name={field}
                        type={field === "password" ? "password" : field}
                        placeholder={
                          field === "username"
                            ? "Choose a username"
                            : field === "email"
                            ? "you@example.com"
                            : "Enter your password"
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <input
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="form-input block w-full px-4 py-3 border rounded-lg"
                  />
                  <textarea
                    name="bio"
                    placeholder="Tell us something about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-input block w-full px-4 py-3 border rounded-lg"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={10}
                    required
                    className="form-input block w-full px-4 py-3 border rounded-lg"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="form-select block w-full px-4 py-3 border rounded-lg"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">
                        Prefer not to say
                      </option>
                    </select>
                    <input
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="form-input block w-full px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-input block w-full px-4 py-3 border rounded-lg"
                  />
                  <div className="flex gap-2">
                    <input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="form-input block w-1/2 px-4 py-3 border rounded-lg"
                    />
                    <input
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="form-input block w-1/2 px-4 py-3 border rounded-lg"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="form-input block w-1/2 px-4 py-3 border rounded-lg"
                    />
                    <input
                      name="postal_code"
                      placeholder="Postal Code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      maxLength={10}
                      required
                      className="form-input block w-1/2 px-4 py-3 border rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-3 bg-gray-300 rounded-lg w-1/2 mr-2"
                  >
                    Back
                  </button>
                )}
                <button
                  type={step === 3 ? "submit" : "button"}
                  onClick={() => {
                    if (step < 3) handleNext();
                  }}
                  className={`px-4 py-3 bg-green-500 text-white rounded-lg ${
                    step === 1 ? "w-full" : "w-1/2"
                  }`}
                >
                  {step === 3 ? "Complete Sign-Up" : "Continue"}
                </button>
              </div>
            </form>

            {/* Link */}
            <p className="text-center text-sm text-green-600/70 dark:text-green-400/70">
              Already have an account?{" "}
              <a
                className="font-medium text-green-500 hover:text-green-400"
                href="/login"
              >
                Sign in
              </a>
            </p>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default Signup;
