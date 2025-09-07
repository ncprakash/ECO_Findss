import React from "react";

const AuthCard = ({ title, children }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-center text-green-700">{title}</h2>
      {children}
    </div>
  );
};

export default AuthCard;
