import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
export default function AddNewProduct  ()  {
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    condition: '',
    year: '',
    brand: '',
    model: '',
    dimensions: '',
    weight: '',
    material: '',
    color: '',
    hasOriginalPackaging: false,
    hasManual: false,
    workingCondition: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product data submitted:', formData);
    // You would typically send this data to an API here.
    alert('Product listing submitted!');
  };

  return (
    <MainLayout>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden p-6 sm:p-8">
        
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add a new Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Product Image Upload */}
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400 cursor-pointer hover:border-blue-500 transition-colors">
            <label htmlFor="image-upload" className="text-center text-gray-500 cursor-pointer">
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} alt="Product Preview" className="h-full w-full object-cover rounded-lg" />
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm">Add product image</p>
                </>
              )}
            </label>
            <input
              id="image-upload"
              type="file"
              name="image"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Core Product Details */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Product Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="">Select Category</option>
              {/* Add your category options here */}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Product Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required className="block w-full rounded-md border-gray-300 pl-7 pr-12 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="0.00" />
            </div>
          </div>

          <hr className="my-6 border-t border-gray-200" />

          {/* Condition and Specifics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
              <input type="text" id="condition" name="condition" value={formData.condition} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year of Manufacture</label>
              <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
          
          {/* Physical Attributes */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
            <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions (L x W x H)</label>
            <input type="text" id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g., 10cm x 5cm x 2cm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
              <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="e.g., 500g" />
            </div>
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material</label>
              <input type="text" id="material" name="material" value={formData.material} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
            <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          {/* Boolean and Final Description */}
          <div className="space-y-4">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input id="hasOriginalPackaging" name="hasOriginalPackaging" type="checkbox" checked={formData.hasOriginalPackaging} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="hasOriginalPackaging" className="font-medium text-gray-700">Original Packaging</label>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input id="hasManual" name="hasManual" type="checkbox" checked={formData.hasManual} onChange={handleChange} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="hasManual" className="font-medium text-gray-700">Manual/Instructions Included</label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="workingCondition" className="block text-sm font-medium text-gray-700">Working Condition Description</label>
            <textarea id="workingCondition" name="workingCondition" rows="3" value={formData.workingCondition} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
    </MainLayout>
  );
};

