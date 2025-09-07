import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

// Dummy product data
const products = [
  { id: '1', title: 'Vintage Chair', price: '$50', imageUrl: 'https://via.placeholder.com/300' },
  { id: '2', title: 'Used Laptop', price: '$300', imageUrl: 'https://via.placeholder.com/300' },
  { id: '3', title: 'Retro Lamp', price: '$35', imageUrl: 'https://via.placeholder.com/300' },
];

function ProductGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Header with Cart Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">EcoFinds Marketplace</h1>
        <Link
          to="/cart"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Cart 🛒
        </Link>
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
