
import React from "react";
export default function HeroSection(){
    return(
    <>
       <div className="bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200">
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
              <div
                className="w-full h-64 sm:h-80 rounded-xl bg-cover bg-center mb-8 shadow-lg"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASCT6VUuEsYVsyfkRRx14-oOTfmX7mog8n0NpauvwYBsRqLmHv6JTK8lHT1s9N4NJAQJrpw9zHIshvgJtVKPcJupElL9Fe8NhMtZYg_OD-O48d5GXjnUKunKn7nkp0cIgxW8jin2h8dByETH1bWmA6XyTPL6mJqtz2RKAAZfioCzRjTHEYM-W-WsmQptIQPlldl6PZ9Oj4J9uutpejm4nrMf3ugOII-gd_-F09a-pt-7xt82pOFn2Xv0CLFB0lo1mZBlbw7lAPoYI")',
                }}
              ></div>
              <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white leading-tight">
                Share, Donate, and Rent – Connect With Your Community 🌱
              </h1>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
                Eco-Finds helps you reuse, share, and make a positive impact in your neighborhood.
              </p>
              <div className="mt-8 w-full flex flex-col sm:flex-row sm:justify-center gap-4">
  <button className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-800 transition-all duration-300">
    Get Started
  </button>
  <button className="w-full sm:w-auto px-8 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-black transition-all duration-300">
    Explore Items
  </button>
</div>
            </div>
          </main>
        </div>
      </div>
    </>)
}