import React, { useState } from "react";

const AddProduct = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert("✅ Product created: " + JSON.stringify(data));
    } catch (err) {
      console.error(err);
      alert("❌ Error creating product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ➕ Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="user_id"
            placeholder="User ID (UUID)"
            value={form.user_id}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={form.title}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="input-field min-h-[80px]"
        />

        {/* Pricing & Quantity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition (New/Used)"
            value={form.condition}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            name="year_of_manufacture"
            placeholder="Year of Manufacture"
            value={form.year_of_manufacture}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="dimensions"
            placeholder="Dimensions (L×W×H)"
            value={form.dimensions}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight (kg/lb)"
            value={form.weight}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="material"
            placeholder="Material"
            value={form.material}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="original_packaging"
              checked={form.original_packaging}
              onChange={handleChange}
              className="toggle-checkbox"
            />
            Original Packaging
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="manual_included"
              checked={form.manual_included}
              onChange={handleChange}
              className="toggle-checkbox"
            />
            Manual Included
          </label>
        </div>

        <textarea
          name="working_condition_desc"
          placeholder="Working Condition Description"
          value={form.working_condition_desc}
          onChange={handleChange}
          className="input-field min-h-[80px]"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
        >
          ✅ Add Product
        </button>
      </form>
    </div>
  );
};

// Tailwind helper classes
// You can add these in your global CSS or Tailwind config
// Or replace with inline classNames as shown above
export default AddProduct;
