import React from "react";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import Banner from "../../components/Banner";
import CategorySection from "../../components/CategorySection";
import ProductGrid from "../../components/ProductGrid";

export default  function LandingPage() {
  const categories = [{id:1,name:"Clothes"},{id:2,name:"Electronics"},{id:3,name:"Books"}];
  const products = [
    {id:1,title:"Shirt",price:20,image:"/placeholder.png"},
    {id:2,title:"Laptop",price:500,image:"/placeholder.png"},
    {id:3,title:"Book",price:10,image:"/placeholder.png"}
  ];

  return (
    <>
      <Navbar />
      <SearchBar />
      <Banner image="/banner.png" />
      <CategorySection categories={categories} />
      <ProductGrid products={products} />
    </>
  );
};


