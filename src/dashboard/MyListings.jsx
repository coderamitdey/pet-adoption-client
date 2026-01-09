import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/api/addlisting?email=${user.email}`)
      .then((res) => setListings(res.data))
      .catch(() => toast.error("Failed to fetch listings"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/addlisting/${id}`)
          .then(() => {
            toast.success("Listing deleted successfully!");
            setListings((prev) => prev.filter((item) => item._id !== id));
          })
          .catch(() => toast.error("Failed to delete listing"));
      }
    });
  };

  if (!user) return <p className="text-center mt-10">Please login</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!listings.length)
    return <p className="text-center mt-10">No listings added yet</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-md p-4 relative">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>
              Price: {item.price ? `৳${item.price.toLocaleString()}` : "Free"}
            </p>
            <p>Location: {item.location}</p>
            <p>Date: {item.date}</p>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover mt-2 rounded"
            />
            <button
              onClick={() => handleDelete(item._id)}
              className="btn btn-error btn-sm absolute top-2 right-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
