import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/listings?limit=6")
      .then(res => {
        console.log("API Response:", res.data); // debug
        const listingsArray = Array.isArray(res.data) ? res.data : res.data.data;
        setListings(listingsArray || []);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(listings) && listings.map(item => (
          <div key={item._id} className="card bg-base-100 shadow-lg">
            <figure>
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover"/>
            </figure>
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>{item.price ? `$${item.price}` : "Free for Adoption"}</p>
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
    </div>
  );
};

export default RecentListings;
