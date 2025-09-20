import React from "react";
import HeroSection from "../../components/HeroSection";
import Benifits from "../../components/Benifits";
import Working from "../../components/working";
import CommunityPost from "../../components/CommunityPost";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";

export default function LandingPage() {
  // 🔑 Replace with your real auth state (context, redux, etc.)
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <MainLayout>
      <HeroSection />
      <Benifits />
      <Working />
      <CommunityPost />

      <div className="bg-green-500 dark:bg-green-700 font-display flex flex-col min-h-screen">
        <div className="relative flex flex-col justify-center flex-grow">
          {/* Green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-600 dark:to-green-800"></div>

          <div className="relative p-8 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              Join Eco-Finds Today – Start Sharing!
            </h1>
            <p className="text-base md:text-lg mb-8 opacity-90">
              Free, secure, and eco-friendly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* ✅ If logged in → always go to dashboard */}
              <Link to={isLoggedIn ? "/user-dashboard" : "/signup"}>
                <button className="px-6 py-3 bg-green-700 text-white font-bold rounded-lg shadow-lg transform hover:bg-green-800 hover:scale-105 transition-all duration-300">
                  Sign Up
                </button>
              </Link>

              <Link to={isLoggedIn ? "/user-dashboard" : "/login"}>
                <button className="px-6 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
