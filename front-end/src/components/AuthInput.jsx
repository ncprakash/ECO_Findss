import React from "react";

const AuthInput = ({ label, type="text", value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
      />
    </div>
  );
};

export default AuthInput;
