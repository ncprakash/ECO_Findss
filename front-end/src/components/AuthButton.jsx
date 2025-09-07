import React from "react";

const AuthButton = ({ text, onClick, type="button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition-all"
    >
      {text}
    </button>
  );
};

export default AuthButton;
