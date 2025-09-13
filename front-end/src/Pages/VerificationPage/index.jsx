import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
function Verification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  const email = searchParams.get('email');

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    const email=localStorage.getItem('signupData');
    if(!email){
      navigate('/signup');
      return;
    }
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^[0-9]?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Auto-focus next input
      if (val && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const signupData = JSON.parse(localStorage.getItem('signupData'));
    const code = otp.join('');
  
    try {
      const res = await axios.post('/api/verify-otp', { email, otp: code, formData: signupData });
      toast.success(res.data.message);
  
      localStorage.removeItem('signupData');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'OTP verification failed');
    }
  };
  const handleResend = async () => {
    try {
        await axios.post('/api/send-otp', { email });  // Send email again

        toast.success('✅ OTP resent successfully!');

        setTimer(60);       // Reset timer
        setResendDisabled(true);
    } catch (error) {
        toast.error(error.response?.data?.error || '❌ Failed to resend OTP.');
    }
};
  

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center border rounded"
          />
        ))}
      </form>

      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Verify
      </button>

      <div className="mt-4">
        {resendDisabled ? (
          <span>Resend OTP in {timer}s</span>
        ) : (
          <button
            onClick={handleResend}
            className="text-blue-600 underline"
          >
            Resend OTP
          </button>
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default Verification;
