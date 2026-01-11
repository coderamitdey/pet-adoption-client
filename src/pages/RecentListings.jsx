import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RecentListings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings")
      .then((res) => {
        setListings(res.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShowMore = () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    setVisibleCount(listings.length);
  };

  const handleShowLess = () => {
    setVisibleCount(6);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.slice(0, visibleCount).map((item) => (
          <div
            key={item._id}
            className="card bg-base-100 shadow-lg transition-transform duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
          >
            <figure>
              <img
                src={item.image || "https://via.placeholder.com/300x200"}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>
                Price:{" "}
                {item.price
                  ? `৳${item.price.toLocaleString()}`
                  : "Free for Adoption"}
              </p>
              <p>Location: {item.location}</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate(`/listing/${item._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {listings.length > 6 && (
        <div className="flex justify-center mt-6">
          {visibleCount === 6 ? (
            <button className="btn btn-outline" onClick={handleShowMore}>
              Show More
            </button>
          ) : (
            <button className="btn btn-outline" onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentListings;
