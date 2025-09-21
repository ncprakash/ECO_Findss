import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

function Verification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    const signupData = localStorage.getItem("signupData");
    if (!signupData) {
      navigate("/signup");
      return;
    }

    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer, navigate]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Auto-focus next input
      if (val && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    const code = otp.join("");

    try {
      const res = await axios.post("/api/verify-otp", {
        email,
        otp: code,
        formData: signupData,
      });

      toast.success(res.data.message);
      localStorage.removeItem("signupData");
      navigate("/user-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "OTP verification failed ❌");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("/api/send-otp", { email });
      toast.success("✅ OTP resent successfully!");
      setTimer(60);
      setResendDisabled(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "❌ Failed to resend OTP.");
    }
  };

  
  return (
    <MainLayout>
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Enter OTP</h1>
        <p className="text-center text-gray-600 mb-6">
          We’ve sent a 4-digit OTP to{" "}
          <span className="font-medium">{email}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              className="w-14 h-14 text-center text-xl font-bold border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          ))}
        </div>

        {/* Verify Button */}
        
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Verify
        </button>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          {resendDisabled ? (
            <span className="text-gray-500">Resend OTP in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>

      <Toaster position="top-center" />
    </div></MainLayout>
  );
}

export default Verification;
