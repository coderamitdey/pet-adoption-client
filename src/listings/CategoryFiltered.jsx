import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CategoryFiltered = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    axios
      .get("https://pet-adoption-server-eta-eight.vercel.app/api/pets_supplies")
      .then((res) => {
        let filtered = [];
        if (categoryName === "Pets") {
          filtered = res.data.filter(
            (item) =>
              item.category === "Dog" ||
              item.category === "Cat" ||
              item.category === "Bird"
          );
        } else {
          filtered = res.data.filter((item) => item.category === categoryName);
        }
        setProducts(filtered);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categoryName, user, navigate, location]);

  if (!user)
    return <p className="text-center mt-10">Please login to see products.</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!products.length)
    return (
      <p className="text-center mt-10">No products found in this category.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">{categoryName} Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item, idx) => (
          <div
            key={item._id || idx}
            className="card bg-base-100 shadow-md p-4 flex flex-col justify-between"
          >
            <img
              src={item.image || "https://via.placeholder.com/400x300"}
              alt={item.name}
              className="h-40 w-full object-cover rounded-md mb-2"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold truncate">{item.name}</h3>
              <p className="text-gray-600 text-sm">Category: {item.category}</p>
              <p className="text-gray-600 text-sm">Location: {item.location}</p>
              <p className="text-gray-600 text-sm">
                Price: {item.price ? `৳${item.price.toLocaleString()}` : "Free"}
              </p>
            </div>
            <button
              onClick={() => navigate(`/pets_supplies/${item._id}`)}
              className="btn btn-primary btn-sm mt-2"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFiltered;
