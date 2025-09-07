import React, { useState } from 'react';
import MyListingCard from '../../components/MyListingCard';
import MainLayout from '../../layouts/MainLayout';

export default function MyListing  ()  {
  // Dummy data for demonstration. In a real application, you would fetch this from an API.
  const [userProducts, setUserProducts] = useState([
    { id: 'prod-101', title: 'Vintage Leather Jacket', price: 5499, status: 'Active', imageUrl: 'https://via.placeholder.com/100' },
    { id: 'prod-102', title: 'Handmade Ceramic Mug', price: 450, status: 'Pending', imageUrl: 'https://via.placeholder.com/100' },
    { id: 'prod-103', title: 'Classic Sci-Fi Book', price: 899, status: 'Sold', imageUrl: 'https://via.placeholder.com/100' },
  ]);

  const handleEdit = (productId) => {
    console.log(`Editing product with ID: ${productId}`);
    // In a real app, you would navigate to the AddNewProduct form with pre-filled data.
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      console.log(`Deleting product with ID: ${productId}`);
      // Filter out the product to simulate deletion
      setUserProducts(userProducts.filter(product => product.id !== productId));
    }
  };

  return (
    <MainLayout>
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Listings</h1>
      
      {/* Search, Sort, Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search my listings..."
          className="flex-grow p-2 border rounded-lg"
        />
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-lg text-sm">Sort</button>
          <button className="px-4 py-2 border rounded-lg text-sm">Filter</button>
          <button className="px-4 py-2 border rounded-lg text-sm">Group by</button>
        </div>
      </div>

      <div className="space-y-4">
        {userProducts.length > 0 ? (
          userProducts.map(product => (
            <MyListingCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">You have no listings yet.</p>
        )}
      </div>
    </div>
    </MainLayout>
  );
};
