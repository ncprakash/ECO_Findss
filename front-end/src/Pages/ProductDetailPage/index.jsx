
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Share2, Heart, MapPin, User, Phone, Mail, RefreshCw, Tag, Calendar, Palette, Package } from "lucide-react";


export default function ProductDetails() {
    const params = useParams();
    const navigate = useNavigate();
    const { id, productId, user_id } = params;
    const actualId = id || productId || user_id;
   
    const userId = localStorage.getItem("user_id")
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [chatOpen,setchatOpen] =useState(false);

    const fetchProduct = async (showRetryToast = false) => {
        try {
            setLoading(true);
            setError(null);
            
            if (showRetryToast) {
                toast.loading("Retrying...");
            }
            
            const res = await axios.get(`/api/product-details/${actualId}`, {
                timeout: 15000,
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (res.status === 200 && res.data) {
                setProduct(res.data);
                if (showRetryToast) {
                    toast.success("Product loaded successfully!");
                }
            } else {
                throw new Error(`Invalid response: ${res.status}`);
            }
            
        } catch (err) {
            let errorMessage = "Failed to load product details";
            
            if (err.response?.status === 404) {
                errorMessage = "Product not found";
            } else if (err.response?.status >= 500) {
                errorMessage = "Server error occurred";
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = "Request timeout";
            } else if (err.code === 'ERR_NETWORK') {
                errorMessage = "Network error - check connection";
            }
            
            setError(errorMessage);
            toast.error(errorMessage);
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (actualId) {
            fetchProduct();
        } else {
            setError("Invalid product ID");
            setLoading(false);
        }
    }, [actualId]);

    const handleRetry = () => {
        fetchProduct(true);
    };

    const handleShare = async () => {
        if (navigator.share && product) {
            try {
                await navigator.share({
                    title: product.title,
                    text: product.description,
                    url: window.location.href
                });
            } catch (err) {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
    };

    const handleContact = () => {
        if (product?.phone) {
            window.open(`tel:${product.phone}`, '_self');
        } else {
            toast.error("Contact information not available");
        }
    };

    // Desktop Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex gap-3">
                            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Section Skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
                            <div className="flex gap-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Content Section Skeleton */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                                <div className="h-10 bg-gray-200 rounded-lg w-1/3 animate-pulse"></div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                            
                            <div className="space-y-4">
                                <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
                    <p className="text-gray-600 mb-8">{error}</p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={handleRetry}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Try Again
                        </button>
                        
                        <button 
                            onClick={() => navigate(-1)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }
 const curruserId=userId;const sellerId=product?.user_id;
    // Desktop Success State
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-colors border shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to listings
                    </button>
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={handleShare}
                            className="p-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors border shadow-sm"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={handleLike}
                            className={`p-2 rounded-lg transition-colors border shadow-sm ${
                                isLiked 
                                    ? 'bg-red-50 text-red-600 border-red-200' 
                                    : 'bg-white hover:bg-red-50 text-gray-600 hover:text-red-600'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg border">
                            {product?.image_url ? (
                                <img 
                                    src={product.image_url} 
                                    alt={product.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop';
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <div className="text-center text-gray-400">
                                        <Package className="w-20 h-20 mx-auto mb-4" />
                                        <p className="text-lg">No image available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Thumbnail navigation (placeholder for future multiple images) */}
                        <div className="flex gap-2">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg border-2 border-blue-500 overflow-hidden opacity-50">
                                <img 
                                    src={product?.image_url || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'} 
                                    alt="" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="space-y-8">
                        {/* Title and Price */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">
                                    {product?.title}
                                </h1>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Tag className="w-4 h-4" />
                                        {product?.category}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {product?.year_of_manufacture}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-baseline gap-4">
                                <span className="text-5xl font-bold text-green-600">
                                    ₹{parseFloat(product?.price || 0).toLocaleString()}
                                </span>
                                <span className="text-lg text-gray-500 bg-gray-100 px-3 py-1 rounded-full capitalize">
                                    {product?.condition} condition
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        {product?.description && (
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Specifications Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Tag, label: 'Brand', value: product?.brand },
                                { icon: Palette, label: 'Color', value: product?.color },
                                { icon: Package, label: 'Material', value: product?.material },
                                { icon: Package, label: 'Dimensions', value: product?.dimensions },
                                { icon: Package, label: 'Weight', value: product?.weight },
                                { icon: Package, label: 'Model', value: product?.model }
                            ].filter(spec => spec.value).map((spec, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <spec.icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-500">{spec.label}</p>
                                            <p className="text-base font-semibold text-gray-900 mt-1 capitalize break-words">
                                                {spec.value}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Seller Information */}
                        {product?.username && (
                            <div className="bg-white p-6 rounded-xl border shadow-sm">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Seller Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.username}</p>
                                            <p className="text-sm text-gray-500">Seller</p>
                                        </div>
                                    </div>
                                    {product.city && (
                                        <div className="flex items-center gap-2 text-gray-600 ml-15">
                                            <MapPin className="w-4 h-4" />
                                            <span>{[product.city, product.state, product.country].filter(Boolean).join(', ')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            {String(localStorage.getItem("user_id")) !== String(product?.user_id || product?.seller_id || product?.userId) && (
                              <button 
                                  className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg"
                              >
                                  <Phone className="w-5 h-5" />
                                  Contact Seller
                              </button>
                            )}
                           
                            
                            
                            <div className="grid grid-cols-2 gap-4">
                                {String(localStorage.getItem("user_id")) !== String(product?.user_id || product?.seller_id || product?.userId) && (
                                  <button  onClick={()=> {
                                      const curruserId = localStorage.getItem("user_id");
                                      const sellerId = product?.user_id || product?.seller_id || product?.userId;
                                      if (!curruserId || !sellerId) {
                                          toast.error("Unable to start chat. Please login.");
                                          return;
                                      }
                                      const roomId = [curruserId, String(sellerId)].sort().join("_");
                                      navigate(`/chat/${roomId}`);
                                  }} className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors border shadow-sm">
                                      <Mail className="w-4 h-4" />
                                      Send Message
                                  </button>
                                )}
                                
                                <button className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition-colors border shadow-sm">
                                    <MapPin className="w-4 h-4" />
                                    View Location
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}