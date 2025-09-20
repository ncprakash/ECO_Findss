import React from "react";

export default function Footer() {
  return (
  

      <footer className="bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-800 dark:text-gray-200">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold text-primary mb-4">Eco-Finds</h2>
            <p className="text-sm">
              Join our community to reuse, share, and donate items. Let's make sustainability a way of life.
            </p>
            <div className="flex space-x-4 mt-6">
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                {/* Facebook SVG */}
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
                </svg>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                {/* Twitter SVG */}
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                {/* Instagram SVG */}
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.712 2.712c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-2.712 2.712c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-2.712-2.712c-.247-.636-.416-1.363-.465-2.427C2.013 14.784 2 14.43 2 12s.013-2.784.06-3.808c.049-1.064.218-1.791.465-2.427A4.902 4.902 0 015.237 2.965c.636-.247 1.363-.416 2.427-.465C8.716 2.013 9.07 2 11.5 2h.815zM12 6.865A5.135 5.135 0 1012 17.135 5.135 5.135 0 0012 6.865zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">How It Works</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Community Guidelines</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay up to date with our latest news and offers.</p>
            <form action="#" className="flex flex-col sm:flex-row gap-2">
              <input
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 border-transparent focus:border-primary focus:ring-0 text-sm"
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Eco-Finds. All rights reserved.</p>
        </div>
      </footer>
    
  );
}
