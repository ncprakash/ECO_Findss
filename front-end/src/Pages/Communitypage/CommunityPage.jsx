import CommunityCard from "@/components/CommunityCard";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { RefreshCw, Plus, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Community() {
    const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const fetchPosts = async (showToast = false) => {
    try {
      if (showToast) {
        setRefreshing(true);
        toast.loading("Refreshing posts...");
      }
      
      const res = await axios.get("/api/post");
      setPosts(res.data);
      setError("");
      
      if (showToast) {
        toast.dismiss();
        toast.success("Posts refreshed successfully!");
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
      
      if (showToast) {
        toast.dismiss();
        toast.error("Failed to refresh posts");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = () => {
    fetchPosts(true);
  };

  // Enhanced CommunityCard with better image display
  const EnhancedCommunityCard = ({ post }) => {
    const [imageError, setImageError] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    
    const handleImageError = () => {
      setImageError(true);
    };

    const handleLike = () => {
      setIsLiked(!isLiked);
      toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              {post.username?.charAt(0)?.toUpperCase() || "A"}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">
                {post.username || "Anonymous User"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{new Date(post.created_at || Date.now()).toLocaleDateString()}</span>
                <span>•</span>
                <span>{new Date(post.created_at || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        {post.description && (
          <div className="px-6 pb-4">
            <p className="text-gray-800 leading-relaxed">
              {post.description}
            </p>
          </div>
        )}

        {/* Enhanced Image Display */}
        {post.image_url && !imageError && (
          <div className="relative group">
            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
              <img
                src={post.image_url}
                alt={post.description || "Post image"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            
            {/* Image overlay for better interaction */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 right-4">
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Error Fallback */}
        {post.image_url && imageError && (
          <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center border-t border-b border-gray-100">
            <div className="text-center text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-6 pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleLike}
              className="flex items-center gap-2 text-sm group hover:bg-red-50 px-3 py-2 rounded-full transition-colors"
            >
              <svg 
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  isLiked ? 'text-red-500 fill-current' : 'text-gray-500 group-hover:text-red-500'
                }`} 
                fill={isLiked ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className={`font-medium ${isLiked ? 'text-red-500' : 'text-gray-600'}`}>
                {post.likes || 0} {(post.likes || 0) === 1 ? 'like' : 'likes'}
              </span>
            </button>

            <button 
              onClick={() => window.location.href = `/product-details/${post.id}`}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading State
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
            </div>
          </div>
          
          {/* Post Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error State
  if (error && posts.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Posts</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={handleRefresh}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Community</h1>
            <p className="text-gray-600 mt-1">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} shared by the community
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" 
                    ? "bg-white text-green-500 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" 
                    ? "bg-white text-green-500 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                refreshing 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-100 hover:bg-green-200 text-green-700 shadow-sm hover:shadow-md'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>

            {/* Create Post Button */}
            <button  onClick={()=>navigate('/add-product')} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md hover:shadow-lg">
              <Plus className="w-4 h-4" />
              Create Post
            </button>
          </div>
        </div>

        {/* Posts Display */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
            <p className="text-gray-600 mb-8">
              Be the first to share something with the community!
            </p>
            <button   className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md">
              Create First Post
            </button>
          </div>
        ) : (
          <div className={`${
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
          }`}>
            {posts.map((post, index) => (
              <div key={post.id || index} className="animate-fadeIn">
                <EnhancedCommunityCard 
                  post={{
                    id: post.id,
                    username: post.user_name || post.username || "Anonymous User",
                    userAvator: post.user_avatar || post.avatar || null,
                    created_at: post.created_at || post.timestamp,
                    description: post.description || post.des || post.content,
                    image_url: post.image_url || post.image,
                    likes: post.likes || post.like_count || 0
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {posts.length > 0 && posts.length % 10 === 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors shadow-sm">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}