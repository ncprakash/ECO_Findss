import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";   
export default function CommunityCard ({ userAvator,username,time,des,image,likes,title }) {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
    <section className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
<div className="flex items-center gap-3">
<div className="relative w-16 h-16 rounded-full overflow-hidden">
<img alt="User avatar" className="w-full h-full object-cover" src={userAvator}/>
</div>
<div className="flex-1">
<h3 className="font-bold">{username}</h3>
<p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
</div>
<button className="text-primary">

</button>
</div>
<div className="mt-4">
<p className="font-medium">{title} : {des}</p>
<div className="mt-2 aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
<img alt="Bicycle image" className="rounded-lg object-cover w-full h-full" src={image}/>
</div>

<div className="mt-3 flex justify-between items-center text-sm">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-red-500"><FaHeart  className="text-green-500 text-2xl"/></span>
<span>{likes} people are interested</span>
</div>
<Link to={isLoggedIn ? "/user-dashboard" : "/login"}>
<button className="text-primary font-semibold">More Info</button></Link>
</div>
</div>
</section>
    </div>
    
  );
};

;
