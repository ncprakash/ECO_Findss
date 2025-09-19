import React, { useState } from "react";

const UserDashboard = () => {
  const [userId, setUserId] = useState(""); // input value
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    if (!userId) {
      alert("Please enter your user_id");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/userDashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }), // user input
      });

      const data = await res.json();
      setUser(data.user);
      setProducts(data.products);
    } catch (err) {
      console.error("❌ Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* User input form */}
      <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-4 mb-6">
        <input
          type="text"
          placeholder="Enter your user_id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={fetchDashboard}
          className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Fetch Dashboard
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center text-lg">Loading...</div>
      )}

      {/* User Profile Card */}
      {user && !loading && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {user.full_name}
          </h2>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-700 mt-4">{user.bio}</p>
          <p className="text-gray-500 mt-2">📧 {user.email}</p>
        </div>
      )}

      {/* Products Section */}
      {products.length > 0 && !loading && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Your Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">
                    {product.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* No data */}
      {!loading && user && products.length === 0 && (
        <p className="text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default UserDashboard;
