import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaClock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CommunityCard({
  id,
  userAvator,
  username,
  time,
  des,
  image,
  likes,
}) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);

  const handleClick = () => {
    navigate(`/product-details/${id}`);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
    // Add API call here to update likes in backend
  };

  const formatTimeAgo = (timeString) => {
    if (!timeString) return "Just now";
    
    const now = new Date();
    const postTime = new Date(timeString);
    const diffInSeconds = Math.floor((now - postTime) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return postTime.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700">
            {userAvator && userAvator !== "null" ? (
              <img
                alt={`${username}'s avatar`}
                className="w-full h-full object-cover"
                src={userAvator}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              <FaUser className="text-xl" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {username || "Anonymous User"}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <FaClock className="text-xs" />
              <span>{formatTimeAgo(time)}</span>
            </div>
          </div>

          {/* Three dots menu */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        {des && (
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {des}
          </p>
        )}
      </div>

      {/* Image */}
      {image && (
        <div className="relative group cursor-pointer" onClick={handleClick}>
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
            <img
              alt="Post content"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={image}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
              }}
            />
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-3 border-t border-gray-50 dark:border-gray-700">
        <div className="flex justify-between items-center">
          {/* Like Section */}
          <button 
            onClick={handleLike}
            className="flex items-center gap-2 text-sm group hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-full transition-colors"
          >
            {isLiked ? (
              <FaHeart className="text-red-500 text-lg group-hover:scale-110 transition-transform" />
            ) : (
              <FaRegHeart className="text-gray-500 dark:text-gray-400 text-lg group-hover:text-red-500 group-hover:scale-110 transition-all" />
            )}
            <span className={`font-medium ${isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
              {likeCount} {likeCount === 1 ? 'person is' : 'people are'} interested
            </span>
          </button>

          {/* More Info Button */}
          <button 
            onClick={handleClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow-md"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}