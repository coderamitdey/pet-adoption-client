import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext"; 
const categories = [
  { name: "Pets", icon: "🐶" },
  { name: "Pet Food", icon: "🍖" },
  { name: "Accessories", icon: "🎀" },
  { name: "Pet Care Products", icon: "🛁" }
];

const Categories = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const handleClick = (categoryName) => {
    if (!user) {
      navigate("/auth/login"); 
      return;
    }
   
    navigate(`/category-filtered-product/${categoryName}?email=${user.email}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="card bg-base-100 shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleClick(cat.name)}
        >
          <div className="card-body text-center">
            <div className="text-4xl">{cat.icon}</div>
            <h2 className="card-title justify-center">{cat.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
