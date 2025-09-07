import React, { useState } from 'react';
export default function CheckoutPage({ cartItems = [], onPlaceOrder }) {
    const [userInfo, setUserInfo] = React.useState({
      name: '',
      email: '',
      address: '',
      paymentMethod: 'Credit Card',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserInfo(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onPlaceOrder({ userInfo, cartItems });
      alert('Order placed successfully!');
    };
  
    const totalPrice = cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(item.price.replace('$', '')) || 0;
      return sum + priceNum;
    }, 0);
  
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
  
        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          {cartItems.length === 0 && (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title}</span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between mt-4 border-t pt-2 font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
  
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded"
          />
          <textarea
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            placeholder="Shipping Address"
            required
            className="w-full p-3 border rounded"
          ></textarea>
  
          <select
            name="paymentMethod"
            value={userInfo.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
  
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    );
  }
  