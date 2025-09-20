import React from "react";
import { FaUsers, FaHandsHelping, FaGift, FaPeopleCarry } from "react-icons/fa"; // icons

export default function Benefits() {
  const benefits = [
    {
      icon: <FaUsers className="text-green-500 text-5xl mb-4" />,
      title: "Share Items",
      desc: "Connect and exchange with your community. Facilitate local sharing and reduce waste.",
    },
    {
      icon: <FaHandsHelping className="text-green-500 text-5xl mb-4" />,
      title: "Donate for Good",
      desc: "Give items new life, earn eco points, and support those in need.",
    },
    {
      icon: <FaGift className="text-green-500 text-5xl mb-4" />,
      title: "Rent & Borrow",
      desc: "Access a wide range of items without purchasing. Save money and reduce consumption.",
    },
    {
      icon: <FaPeopleCarry className="text-green-500 text-5xl mb-4" />,
      title: "Build Community",
      desc: "Foster connections with like-minded individuals through shared resources and local engagement.",
    },
  ];

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
          Why Choose <span className="text-primary">Eco-Finds?</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Our platform empowers you to share, donate, and rent with ease — 
          creating a sustainable and connected community.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {item.icon}
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
