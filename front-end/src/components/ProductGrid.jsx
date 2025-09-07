import React from 'react';
import ProductCard from './ProductCard';

// Example dummy product data
const products = [
  { id: '1', title: 'Vintage Chair', price: '$50', imageUrl: 'https://via.placeholder.com/300' },
  { id: '2', title: 'Used Laptop', price: '$300', imageUrl: 'https://via.placeholder.com/300' },
  { id: '3', title: 'Retro Lamp', price: '$35', imageUrl: 'https://via.placeholder.com/300' },
];

function ProductGrid() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}

export default ProductGrid;
