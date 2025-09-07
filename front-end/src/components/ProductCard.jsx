import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  if (!product || !product.id) {
    return (
      <div className="p-4 bg-red-100 text-red-700">
        Invalid product data
      </div>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white rounded-lg shadow p-4 hover:bg-gray-100 transition"
    >
      <img
        src={product.imageUrl || 'https://via.placeholder.com/150'}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{product.title}</h3>
      <p className="text-gray-600">{product.price}</p>
    </Link>
  );
}

export default ProductCard;
