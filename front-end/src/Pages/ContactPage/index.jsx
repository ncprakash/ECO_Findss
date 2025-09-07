// pages/ContactPage.jsx
import React, { useState } from 'react';
import { FaLeaf,FaMapMarkerAlt,FaPhone } from 'react-icons/fa';
import MainLayout from '../../layouts/MainLayout';

export default function ContactPage  ()  {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You would typically send this data to a backend or a form service here.
    setIsSubmitted(true);
  };

  return (
    <MainLayout>
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden md:flex">
        {/* Left Side: Contact Info & Theme */}
        <div className="md:w-1/2 p-8 bg-green-700 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-8 opacity-90">
              We'd love to hear from you! Whether you have a question about our products or want to share your ideas on sustainability, feel free to reach out.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaLeaf className="text-2xl" />
                <span>info@eco-brand.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-2xl" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-2xl" />
                <span>123 Eco-friendly Lane, Green City, 90210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          {isSubmitted ? (
            <div className="text-center py-10 text-green-700">
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p>Your message has been sent. We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </MainLayout>
  );
};
