import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const UserDashboard = () => {
  const [userId, setUserId] = useState("");
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
        body: JSON.stringify({ user_id: userId }),
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
s
  return (
    <MainLayout>

   
    </MainLayout>
  );
};

export default UserDashboard;
