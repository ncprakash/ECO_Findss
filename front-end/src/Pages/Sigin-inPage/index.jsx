// src/components/SignupForm.jsx
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
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
    if (name === "phone") {
      value = value.replace(/\D/g, ""); // only numbers
    }
    if (name === "dob") {
      // Only allow digits and "-" and limit length to 10 (DD-MM-YYYY)
      value = value.replace(/[^0-9-]/g, "").slice(0, 10);
    }
    if (name === "postal_code") {
      value = value.replace(/\D/g, ""); // only numbers
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", formData);
      alert(res.data.message);
      setFormData({
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
      setStep(1);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const stepHeadings = [
    {
      title: "Tell us about yourself",
      subtitle: "Let's get your profile set up.",
    },
    {
      title: "Almost there!!!",
      subtitle: "Please provide your address details.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="w-full">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h1 className="text-xl font-bold text-green-600 dark:text-green-400">
              ECO Finds
            </h1>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
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
                ? "start your journey with us."
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
                    <label
                      htmlFor={field}
                      className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                    >
                      {field === "username"
                        ? "Username"
                        : field === "email"
                        ? "Email address"
                        : "Password"}
                    </label>
                    <input
                      id={field}
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
                      className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="full_name"
                    className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                  >
                    Full Name
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us something about yourself"
                    value={formData.bio}
                    onChange={handleChange}
                    className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="form-select mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="dob"
                      className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                    >
                      Date of Birth
                    </label>
                    <input
                      id="dob"
                      name="dob"
                      type="date"
                      placeholder="DD-MM-YYYY"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-medium text-black-600/80 dark:text-black-400/80"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-input mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="form-input mt-1 block w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                  <input
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="form-input mt-1 block w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    id="country"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="form-input mt-1 block w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                  <input
                    id="postal_code"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                    maxLength={10}
                    className="form-input mt-1 block w-1/2 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark/70 text-black-600 dark:text-black-400 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {/* Navigation buttons */}
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
      // Validation: all fields in current step must be filled
      let requiredFields = [];
      if (step === 1) requiredFields = ["username", "email", "password"];
      if (step === 2) requiredFields = ["full_name", "phone", "gender", "dob"];
      if (step === 3)
        requiredFields = ["address", "city", "state", "country", "postal_code"];

      const allFilled = requiredFields.every(
        (field) => formData[field] && formData[field].toString().trim() !== ""
      );

      if (!allFilled) {
        alert("Please fill in all required fields to continue.");
        return;
      }

      step < 3 ? handleNext() : null;
    }}
    className={`px-4 py-3 bg-green-500 text-white rounded-lg ${
      step === 1 ? "w-full" : "w-1/2"
    }`}
  >
    {step === 3 ? "Complete Sign-Up" : "Continue"}
    </button>
    </div>

          </form>

          <p className="text-center text-sm text-green-600/70 dark:text-green-400/70">
            Already have an account?{" "}
            <a className="font-medium text-green-500 hover:text-green-400" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
