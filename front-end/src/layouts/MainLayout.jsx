import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen flex flex-col">
      {/* Navbar appears on all pages */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      {/* Footer appears on all pages */}
      <Footer />
    </div>
  );
}
