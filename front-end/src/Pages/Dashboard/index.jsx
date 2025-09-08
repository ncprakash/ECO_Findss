import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Edit2 } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user); // ✅ set user object
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };
    fetchData();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const chartData = [
    { name: "Friends", value: user.friends_count || 0 },
    { name: "Posts", value: 12 },
    { name: "Likes", value: 40 },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Overview */}
      <Card className="md:col-span-1 shadow-xl">
        <CardContent className="p-6 text-center">
          <img
            src={user.avatar_url || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 mx-auto rounded-full border object-cover mb-4"
          />
          <h2 className="text-2xl font-bold">{user.full_name || user.username}</h2>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-3 text-sm text-gray-500">{user.bio || "No bio available."}</p>
          <button className="mt-4 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center gap-1 mx-auto">
            <Edit2 size={16} /> Edit Profile
          </button>
        </CardContent>
      </Card>

      {/* User Details */}
      <Card className="md:col-span-2 shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Full Name:</span> {user.full_name}</p>
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {user.address || "N/A"}</p>
            <p><span className="font-semibold">City:</span> {user.city || "N/A"}</p>
            <p><span className="font-semibold">State:</span> {user.state || "N/A"}</p>
            <p><span className="font-semibold">Country:</span> {user.country || "N/A"}</p>
            <p><span className="font-semibold">Postal Code:</span> {user.postal_code || "N/A"}</p>
            <p><span className="font-semibold">Friends:</span> {user.friends_count}</p>
            <p><span className="font-semibold">Created:</span> {new Date(user.created_at).toLocaleDateString()}</p>
            <p><span className="font-semibold">Updated:</span> {new Date(user.updated_at).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="md:col-span-3 shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity */}
      <Card className="md:col-span-3 shadow-xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-600">No recent activity to display.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
