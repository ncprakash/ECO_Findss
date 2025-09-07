import React from "react";

export default function CategorySection ({ categories }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">All Categories</h2>
      <div className="flex gap-4 overflow-x-auto">
        {categories.map((cat) => (
          <div key={cat.id} className="flex-none w-32 h-32 bg-green-100 rounded-lg flex items-center justify-center font-semibold">
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

;
