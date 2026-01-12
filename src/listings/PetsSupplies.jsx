import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PetsSupplies = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://pet-adoption-server-eta-eight.vercel.app/api/pets_supplies")
      .then((res) => {
        setListings(res.data);
        setFilteredListings(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (category === "All") {
      setFilteredListings(listings);
    } else if (category === "Pets") {
      setFilteredListings(
        listings.filter(
          (item) =>
            item.category === "Dog" ||
            item.category === "Cat" ||
            item.category === "Bird"
        )
      );
    } else {
      setFilteredListings(
        listings.filter((item) => item.category === category)
      );
    }
  }, [category, listings]);

  const handleSeeDetails = (id) => {
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/pets_supplies/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Pets & Supplies</h2>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Filter by Category:</label>
        <select
          className="select select-bordered w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pets">Pets</option>
          <option value="Pet Food">Pet Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Pet Care Products">Pet Care Products</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredListings.map((item, index) => (
          <div
            key={item._id || index}
            className="card bg-base-100 shadow-lg transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl p-5"
          >
            <img
              src={item.image || "https://via.placeholder.com/400x300"}
              alt={item.name}
              className="h-40 w-80 mx-auto object-cover rounded-xl"
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
              onClick={() => handleSeeDetails(item._id)}
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

export default PetsSupplies;
