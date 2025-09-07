// pages/AboutPage.jsx
import React from 'react';
import { FaRecycle, FaSeedling, FaLeaf } from 'react-icons/fa'; // Example icons
import MainLayout from '../../layouts/MainLayout';

export default function AboutPage ()  {
  return (
    <MainLayout>
    <div className="bg-gray-50 text-gray-800 font-sans">
      <header className="relative h-96 overflow-hidden">
        <img
          src="https://via.placeholder.com/1920x400"
          alt="Green, lush landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900 bg-opacity-70 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold text-center drop-shadow-lg">
            Our Commitment to a Greener Planet
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section className="mb-12 md:mb-20">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed">
                Born from a passion for sustainability, our journey began with a simple idea: to reduce waste and create a positive impact. We saw an opportunity to redefine how products are made and consumed, focusing on **eco-friendly materials**, **ethical sourcing**, and a **circular economy**. Every product we create is a step toward a more sustainable future.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img src="https://via.placeholder.com/600x400" alt="Team working in an eco-friendly office" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </section>

        <hr className="my-12 border-green-200" />

        {/* Our Values Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md border border-green-100">
              <FaRecycle className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Waste Reduction</h3>
              <p className="text-gray-600">
                We're committed to minimizing our environmental footprint by using recycled materials and promoting a zero-waste lifestyle.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border border-green-100">
              <FaSeedling className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Sustainable Sourcing</h3>
              <p className="text-gray-600">
                All our products are made from sustainably sourced, biodegradable, and non-toxic materials.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border border-green-100">
              <FaLeaf className="text-5xl text-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Ethical Practices</h3>
              <p className="text-gray-600">
                We ensure fair labor practices and support communities that share our vision for a better world.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
    </MainLayout>
  );
};

