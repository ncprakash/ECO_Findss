import React from "react";

export default function SearchBar ()  {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 p-4">
      <input
        type="text"
        placeholder="Search ..."
        className="border rounded-lg px-4 py-2 w-full md:flex-1 focus:outline-none"
      />
      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Sort</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Filter</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Groupby</button>
      </div>
    </div>
  );
};


