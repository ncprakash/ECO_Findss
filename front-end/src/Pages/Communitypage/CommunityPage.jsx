import CommunityCard from "@/components/CommunityCard";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/post"); // matches backend GET /api/post
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="p-4">Loading posts...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts.map((post) => (
            <CommunityCard
              key={post.id} // or post._id if coming from Mongo/Postgres
              username={post.user_name || post.username} // adjust according to DB
              userAvator={post.user_avatar || "null"} // fallback avatar
              time={post.created_at ? new Date(post.created_at).toLocaleString() : "Just now"} // format if timestamp exists
              des={post.description || post.des}
              image={post.image_url || post.image || ""}
              likes={post.likes || 0} // optional
            />
          ))
        )}
      </div>
    </MainLayout>
  );
}
