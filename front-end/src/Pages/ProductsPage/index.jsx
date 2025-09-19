import React, { useState } from "react";

const ProductForm = () => {
  const [form, setForm] = useState({
    user_id: "",
    image_url: "",
    title: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    condition: "",
    year_of_manufacture: "",
    brand: "",
    model: "",
    dimensions: "",
    weight: "",
    material: "",
    color: "",
    original_packaging: false,
    manual_included: false,
    working_condition_desc: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit form
  // Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Failed to create product");

    const data = await res.json();
    alert("✅ Product created added to the list");

    // ✅ Reset form after success
    setForm({
      user_id: "",
      image_url: "",
      title: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      condition: "",
      year_of_manufacture: "",
      brand: "",
      model: "",
      dimensions: "",
      weight: "",
      material: "",
      color: "",
      original_packaging: false,
      manual_included: false,
      working_condition_desc: "",
    });

  } catch (err) {
    console.error("❌ Error:", err);
    alert("Error creating product");
  }
};

  return (
   <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 mt-4">
  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
    List an Item
  </h2>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Basic Info */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* User ID */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">User ID</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="user_id"
          placeholder="Enter your unique user ID"
          value={form.user_id}
          onChange={handleChange}
          required
        />
      </div>

      {/* Image URL */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Image URL</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="image_url"
          placeholder="Paste a valid image URL"
          value={form.image_url}
          onChange={handleChange}
        />
      </div>

      {/* Title */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Title</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="title"
          placeholder="Give your product a catchy title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Category</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="category"
          placeholder="E.g., Electronics, Furniture, Clothing"
          value={form.category}
          onChange={handleChange}
          required
        />
      </div>
    </div>

    {/* Description */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Description</label>
      <textarea
        className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px] w-full transition"
        name="description"
        placeholder="Provide a detailed description of your product, its features, and usage."
        value={form.description}
        onChange={handleChange}
      />
    </div>

    {/* Pricing & Quantity */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Price</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          type="number"
          name="price"
          placeholder="Enter price in INR"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Quantity</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          type="number"
          name="quantity"
          placeholder="Available stock quantity"
          value={form.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Condition</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="condition"
          placeholder="New or Used"
          value={form.condition}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* More Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Year of Manufacture</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          type="number"
          name="year_of_manufacture"
          placeholder="E.g., 2020"
          value={form.year_of_manufacture}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Brand</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="brand"
          placeholder="Brand name of the product"
          value={form.brand}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Model</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="model"
          placeholder="Model or series number"
          value={form.model}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Dimensions</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="dimensions"
          placeholder="L x W x H in cm"
          value={form.dimensions}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Weight</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="weight"
          placeholder="Weight in kg"
          value={form.weight}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Material</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="material"
          placeholder="E.g., Wood, Plastic, Metal"
          value={form.material}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Color</label>
        <input
          className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          name="color"
          placeholder="Primary color of the product"
          value={form.color}
          onChange={handleChange}
        />
      </div>
    </div>

    {/* Toggles */}
    <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
      <label className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
        <input
          type="checkbox"
          name="original_packaging"
          checked={form.original_packaging}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />
        Original Packaging
      </label>
      <label className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
        <input
          type="checkbox"
          name="manual_included"
          checked={form.manual_included}
          onChange={handleChange}
          className="w-5 h-5 accent-green-600"
        />
        Manual Included
      </label>
    </div>

    {/* Working Condition */}
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1 text-sm md:text-base">Working Condition Description</label>
      <textarea
        className="input border border-green-500 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[100px] w-full transition"
        name="working_condition_desc"
        placeholder="Describe how well the product works or any defects"
        value={form.working_condition_desc}
        onChange={handleChange}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-green-600 text-white font-semibold py-3 rounded-2xl hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-lg text-sm md:text-base"
    >
      ✅ Submit Product
    </button>
  </form>
</div>

  );
};

export default ProductForm;
