
import CommunityCard from "@/components/CommunityCard";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

export default function Community() {
  // Dummy data
  const posts = [
    {
      id: 1,
      username: "Alice",
      userAvator: "https://i.pravatar.cc/150?img=1",
      time: "2 hours ago",
      des: "Loving this eco-friendly product!",
      image: "https://images.unsplash.com/photo-1598514982910-38c7d2a3c1c8?w=600",
      likes: 12,
    },
    {
      id: 2,
      username: "Bob",
      userAvator: "https://i.pravatar.cc/150?img=2",
      time: "1 day ago",
      des: "Just joined the community!",
      image: "",
      likes: 5,
    },
    {
      id: 3,
      username: "Charlie",
      userAvator: "https://i.pravatar.cc/150?img=3",
      time: "3 days ago",
      des: "Check out my new eco-project!",
      image: "https://images.unsplash.com/photo-1602526212581-232e3f1c8c84?w=600",
      likes: 20,
    },
  ];

  return (
    <MainLayout>
    <div className="p-4 space-y-4">
      {posts.map((post) => (
        <CommunityCard
          key={post.id}
          username={post.username}
          userAvator={post.userAvator}
          time={post.time}
          des={post.des}
          image={post.image}
          likes={post.likes}
        />
      ))}
    </div>
    </MainLayout>
  );
}
