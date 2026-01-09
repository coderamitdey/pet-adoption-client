// CategorySection.jsx
import React from "react";
import { useNavigate } from "react-router";

const categories = [
  { name: "Pets", icon: "🐶" },
  { name: "Pet Food", icon: "🍖" },
  { name: "Accessories", icon: "🎀" },
  { name: "Pet Care Products", icon: "🛁" }
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className="card bg-base-100 shadow-lg cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate(`/category-filtered-product/${cat.name}`)}
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
