import React, { useState } from 'react';
import { Upload, X, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import axios from 'axios';

const AddNewProduct = () => {
  const [formData, setFormData] = useState({
    image_url: '',
    user_id: '',
    title: '',
    category: '',
    description: '',
    price: '',
    quantity: '1',
    condition: '',
    year_of_manufacture: '',
    brand: '',
    model: '',
    dimensions: '',
    weight: '',
    material: '',
    color: '',
    original_packaging: false,
    manual_included: false,
    working_condition_desc: '',
    listing_type: 'selling'
  });

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const categories = [
    'Electronics',
    'Furniture', 
    'Clothing & Accessories',
    'Books & Media',
    'Sports & Outdoors',
    'Home & Garden',
    'Toys & Games',
    'Musical Instruments',
    'Art & Collectibles',
    'Other'
  ];

  const conditions = [
    { value: 'new', label: 'Brand New', desc: 'Never used, in original packaging' },
    { value: 'like-new', label: 'Like New', desc: 'Used once or twice, excellent condition' },
    { value: 'good', label: 'Good', desc: 'Used but well maintained' },
    { value: 'fair', label: 'Fair', desc: 'Shows wear but fully functional' },
    { value: 'poor', label: 'Poor', desc: 'Heavy wear, may need repairs' }
  ];

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.title.trim()) newErrors.title = 'Title is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (formData.listing_type === 'selling' && (!formData.price || formData.price <= 0)) {
        newErrors.price = 'Price is required for selling items';
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.condition) newErrors.condition = 'Condition is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e.target.result,
          file
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    const userId = localStorage.getItem("user_id");
    
    try {
      // Prepare data to match backend API exactly
      const productData = {
        user_id:  userId,
        image_url: uploadedImages.length > 0 ? uploadedImages[0].url : "",
        title: formData.title,
        category: formData.category,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        quantity: parseInt(formData.quantity) || 1,
        condition: formData.condition,
        year_of_manufacture: formData.year_of_manufacture ? parseInt(formData.year_of_manufacture) : null,
        brand: formData.brand || null,
        model: formData.model || null,
        dimensions: formData.dimensions || null,
        weight: formData.weight || null,
        material: formData.material || null,
        color: formData.color || null,
        original_packaging: formData.original_packaging,
        manual_included: formData.manual_included,
        working_condition_desc: formData.working_condition_desc || null
      };

       const response = await axios.post('http://localhost:3000/api/products', productData);
      
      // Success message
      toast.success("✅ Product listed successfully!");
      
      // Reset form
      setFormData({
        image_url: '',
        user_id: '',
        title: '',
        category: '',
        description: '',
        price: '',
        quantity: '1',
        condition: '',
        year_of_manufacture: '',
        brand: '',
        model: '',
        dimensions: '',
        weight: '',
        material: '',
        color: '',
        original_packaging: false,
        manual_included: false,
        working_condition_desc: '',
        listing_type: 'selling'
      });
      setUploadedImages([]);
      setStep(1);

    } catch (error) {
    toast.error(" Error:", error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        toast.error(`Error: ${error.response.data.error || 'Failed to create product'}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        toast.error("Error creating product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNum 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step > stepNum ? <CheckCircle size={16} /> : stepNum}
            </div>
            {stepNum < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                step > stepNum ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>Basic Details</span>
        <span>Item Info</span>
        <span>Review</span>
      </div>
    </div>
  );

  const ItemPreview = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="h-48 bg-gray-100 flex items-center justify-center relative">
        {uploadedImages.length > 0 ? (
          <img 
            src={uploadedImages[0].url} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400">
            <Upload size={48} />
            <p className="mt-2">No image uploaded</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg">{formData.title || 'Item Title'}</h3>
            <p className="text-sm text-gray-500">{formData.category || 'Category'}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            formData.listing_type === 'selling' 
              ? 'bg-green-100 text-green-800'
              : formData.listing_type === 'donating'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {formData.listing_type.charAt(0).toUpperCase() + formData.listing_type.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          {formData.description || 'Item description will appear here...'}
        </p>
        {formData.listing_type === 'selling' && (
          <p className="text-xl font-bold text-green-600">
            ₹{formData.price || '0.00'}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Item</h1>
          <p className="text-gray-600">Sell, donate, or share items with your community</p>
        </div>

        <ProgressBar />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-6">
              
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Listing Type */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">What would you like to do?</h2>
                    <div className="grid grid-cols-3 gap-4">
                      {['selling', 'donating', 'sharing'].map((type) => (
                        <label key={type} className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${
                          formData.listing_type === type
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="listing_type"
                            value={type}
                            checked={formData.listing_type === type}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="font-medium text-gray-900 mb-1">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {type === 'selling' && 'Earn money'}
                            {type === 'donating' && 'Give back'}
                            {type === 'sharing' && 'Lend temporarily'}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Basic Item Details */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Tell us about your item</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Item Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.title ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Vintage Leather Chair"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="4"
                          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Describe your item in detail..."
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                      </div>

                      {formData.listing_type === 'selling' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price * ($)
                            </label>
                            <input
                              type="number"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              step="0.01"
                              min="0"
                              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                                errors.price ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleChange}
                              min="1"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Item Details */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Images */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Add Photos</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <span className="font-medium text-green-600">Click to upload</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    </div>
                    
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.url}
                              alt="Upload preview"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Condition */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Item Condition *</h2>
                    <div className="space-y-3">
                      {conditions.map((cond) => (
                        <label key={cond.value} className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.condition === cond.value
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="condition"
                            value={cond.value}
                            checked={formData.condition === cond.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{cond.label}</div>
                            <div className="text-sm text-gray-500">{cond.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                  </div>

                  {/* Additional Details */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        placeholder="Model"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        name="year_of_manufacture"
                        value={formData.year_of_manufacture}
                        onChange={handleChange}
                        placeholder="Year"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="Color"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="dimensions"
                        value={formData.dimensions}
                        onChange={handleChange}
                        placeholder="Dimensions (e.g., 10x5x3 in)"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight (e.g., 5 lbs)"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        placeholder="Material"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="original_packaging"
                          checked={formData.original_packaging}
                          onChange={handleChange}
                          className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span>Original packaging included</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          name="manual_included"
                          checked={formData.manual_included}
                          onChange={handleChange}
                          className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span>Manual included</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
                  <textarea
                    name="working_condition_desc"
                    value={formData.working_condition_desc}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any other details about functionality, defects, or special features..."
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 ml-auto"
                  >
                    {isSubmitting ? 'Creating...' : 'List Item'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Preview</h3>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-green-600 hover:text-green-700"
                >
                  {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {showPreview && <ItemPreview />}
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;