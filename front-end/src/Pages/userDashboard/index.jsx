import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: "", email: "", full_name: "", phone: "", gender: "", dob: "", address: "", city: "", state: "", country: "", postal_code: "", bio: "", avatar_url: "" });
  const [uploading, setUploading] = useState(false);

  // Fetch dashboard data
  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
  
    if (!token || !userId) {
      toast.error("You are not logged in or user_id is missing");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/userDashboard",
        { user_id: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setFriends(res.data.user.friends_count);
      setEcoPoints(res.data.user.eco_points);
      setMyPosts(res.data.products || []); // assuming backend returns products/posts
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
  const openEdit = () => {
    if (!user) return;
    setEditForm({
      username: user.username || "",
      email: user.email || "",
      full_name: user.full_name || "",
      phone: user.phone || "",
      gender: user.gender || "",
      dob: user.dob ? String(user.dob).slice(0,10) : "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      country: user.country || "",
      postal_code: user.postal_code || "",
      bio: user.bio || "",
      avatar_url: user.avatar_url || ""
    });
    setIsEditing(true);
  };

  const handleAvatarUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const res = await axios.post("/api/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setEditForm((f) => ({ ...f, avatar_url: res.data.secure_url }));
      toast.success("Avatar uploaded");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        "/api/profile",
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      toast.success("Profile updated");
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Update failed");
    }
  };

  const deletePost = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const t = toast.loading("Deleting post...");
      await axios.delete(`/api/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setMyPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted", { id: t });
    } catch (err) {
      toast.error(err.response?.data?.error || "Delete failed");
    }
  };

  const requestDelete = (id) => {
    const toastId = toast.warning("Delete this post?", {
      duration: 6000,
      action: {
        label: "Delete",
        onClick: () => deletePost(id)
      }
    });
    return toastId;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  if (loading) return <p className="p-4 text-center">Loading dashboard...</p>;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-4">
      {/* Profile Card */}
      {user && (
        <section className="w-[90vw] mx-auto mb-4">
          <div className="flex flex-col md:flex-row items-start gap-24 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl transition-colors">
            {/* Avatar */}
            <div
              className="w-48 h-48 rounded-full bg-cover bg-center ring-4 ring-green-200 dark:ring-green-700 shadow-lg flex-shrink-0"
              style={{ backgroundImage: `url(${user.avatar_url || "/default-avatar.png"})` }}
            />

            {/* Right Content */}
            <div className="flex-1 flex flex-col justify-start">
              <p className="text-3xl font-bold text-slate-800 dark:text-white">{user.username}</p>

              {/* Stats */}
              <div className="flex gap-6 mt-1">
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{myPosts.length}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Posts</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{friends}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Friends</p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold text-slate-800 dark:text-white">{ecoPoints}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Eco Points</p>
                </div>
 
              </div>

              {/* Full Name + Bio + Address */}
              <div className="mt-1">
                <p className="font-semibold text-slate-800 dark:text-white">{user.full_name}</p>
                {user.bio && <p className="text-sm text-slate-700 dark:text-slate-300">{user.bio}</p>}
                {(user.city || user.country) && (
                  <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    📍 {user.city}, {user.country}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button onClick={openEdit} className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700 transition-colors shadow-sm">
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-200 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-full max-w-lg shadow-2xl">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Edit Profile</h3>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Username</label>
                  <input value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Email</label>
                  <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Full Name</label>
                  <input value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Phone</label>
                  <input value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Gender</label>
                  <select value={editForm.gender} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className="w-full border rounded-lg px-3 py-2">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Date of Birth</label>
                  <input type="date" value={editForm.dob} onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-slate-700 dark:text-slate-300">Address</label>
                  <input value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">City</label>
                  <input value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">State</label>
                  <input value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Country</label>
                  <input value={editForm.country} onChange={(e) => setEditForm({ ...editForm, country: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm text-slate-700 dark:text-slate-300">Postal Code</label>
                  <input value={editForm.postal_code} onChange={(e) => setEditForm({ ...editForm, postal_code: e.target.value })} className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>

              <label className="text-sm text-slate-700 dark:text-slate-300 mt-2">Bio</label>
              <textarea value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} className="border rounded-lg px-3 py-2" />

              <label className="text-sm text-slate-700 dark:text-slate-300">Avatar</label>
              <div className="flex items-center gap-3">
                <input type="file" accept="image/*" onChange={(e) => handleAvatarUpload(e.target.files?.[0])} />
                {uploading && <span className="text-sm text-slate-500">Uploading...</span>}
              </div>
              {editForm.avatar_url && (
                <img src={editForm.avatar_url} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button onClick={saveProfile} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

    <section className="w-[90vw] mx-auto mt-8">
  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">My Posts</h2>

  {myPosts.length === 0 ? (
    <div className="text-center text-gray-500 py-12">
      <p>No posts found</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {myPosts.map((product) => (
        <div
          key={product.id}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Image Unavailable</span>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <h3 className="font-semibold text-lg text-slate-800 dark:text-white">
              {product.title || "Untitled Product"}
            </h3>
            <p><strong>Category:</strong> {product.category || "N/A"}</p>
            <p><strong>Description:</strong> {product.description || "No description provided."}</p>
          </div>

          {/* View Details + Delete Button */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-700">
            <div className="flex gap-3">
              <button
                onClick={() => window.location.href = `/product-details/${product.id}`}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
              >
                View Details
              </button>
              {String(product.user_id) === String(localStorage.getItem("user_id")) && (
                <button
                  onClick={() => requestDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</section>



    </div>
  );
};

export default UserDashboard;
