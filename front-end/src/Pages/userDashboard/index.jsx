import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner"
import { MapPin, List, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("map");

  // Fetch dashboard data
  const fetchDashboard = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id"); // or get it from state/input
  
    if (!token || !userId) {
      toast.error("You are not logged in or user_id is missing");
      navigate("/login");
      return;
    }
  
    axios
      .post(
        "/api/userDashboard",
        { user_id: userId }, // send user_id in body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.user);
        setFriends(res.data.user.friends_count);
        setEcoPoints(res.data.user.eco_points);
        setMyPosts(res.data.posts || []);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };
  
  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (loading) {
    return <p className="p-4 text-center">Loading dashboard...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      {/* Profile Section */}
      {user && (
        <section className="flex flex-col items-center gap-4 text-center mb-6">
          <div
            className="aspect-square w-32 rounded-full bg-cover bg-center shadow-lg ring-4 ring-green-200 dark:ring-green-700"
            style={{ backgroundImage: `url(${user.avatar_url})` }}
          />
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{user.full_name}</p>
          <p className="text-base text-slate-600 dark:text-slate-400">@{user.username}</p>
          <p className="text-base text-slate-700 dark:text-slate-300">{user.bio}</p>
          <p className="text-base text-slate-700 dark:text-slate-300">{user.city}, {user.country}</p>

          <div className="flex gap-3 w-full max-w-sm mt-2">
            <button className="flex-1 rounded-lg bg-green-100 px-4 py-2.5 text-sm font-bold text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700 transition-colors">
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 rounded-lg bg-red-100 px-4 py-2.5 text-sm font-bold text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col items-center gap-1 rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-700 dark:bg-slate-800">
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{friends}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Friends</p>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-lg border border-green-200 bg-white p-4 shadow-sm dark:border-green-700 dark:bg-slate-800">
          <p className="text-2xl font-bold text-slate-800 dark:text-white">{ecoPoints}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Eco Points</p>
        </div>
      </section>

      {/* My Posts */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">My Posts</h2>
        {myPosts.length === 0 ? (
          <p className="text-center text-gray-500">No posts found</p>
        ) : (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start gap-3 rounded-lg border border-transparent p-2 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              >
                <div
                  className="h-10 w-10 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.avatar})` }}
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{post.user}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{post.time}</p>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 right-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:scale-105 hover:bg-green-700 transition-transform">
        <Plus className="h-8 w-8" />
      </button>
    </div>
  );
};

export default UserDashboard;
