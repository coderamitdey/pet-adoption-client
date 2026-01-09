import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [showAll, setShowAll] = useState(false); 
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/listings") // 
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setListings(data || []);
      })
      .catch(err => console.error("Error fetching listings:", err));
  }, []);


  const displayedListings = !user
    ? listings.slice(0, 6) 
    : showAll
    ? listings 
    : listings.slice(0, 6); 

  const handleShowMore = () => {
    if (!user) {
     
      navigate("/auth/login");
    } else {
     
      setShowAll(prev => !prev);
    }
  };

  return (
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Recent Listings</h2>

      {listings.length === 0 ? (
        <p className="text-gray-500">No listings found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedListings.map(item => (
              <div key={item._id} className="card bg-base-100 shadow-lg">
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
                  <p>{item.price ? `BDT : ${item.price}` : "Free for Adoption"}</p>

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

          {/* Show More / Show Less button */}
          {listings.length > 6 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                className="btn btn-outline btn-md"
              >
                {!user
                  ? "Show More (Login Required)"
                  : showAll
                  ? "Show Less"
                  : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentListings;
