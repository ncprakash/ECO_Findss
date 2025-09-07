import React from "react";

const Banner = ({ image }) => {
  return (
    <div className="w-full p-4">
      <img src={image} alt="Banner" className="w-full rounded-lg shadow-lg" />
    </div>
  );
};

export default Banner;
