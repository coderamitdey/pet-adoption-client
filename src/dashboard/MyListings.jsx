import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/my-listings?email=${user.email}`)
      .then((res) => setListings(res.data));
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        axios.delete(`http://localhost:5000/api/listings/${id}`);
        setListings(listings.filter((i) => i._id !== id));
      }
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {listings.map((item) => (
        <div key={item._id} className="card p-4 relative">
          <img src={item.image} className="h-40 w-full object-cover" />
          <h3>{item.name}</h3>
          <p>Category: {item.category}</p>
          <p>
            Price: {item.price ? `৳${item.price.toLocaleString()}` : "Free"}
          </p>
          <p>Location: {item.location}</p>
          <p>Date: {item.date}</p>
          <button
            onClick={() => handleDelete(item._id)}
            className="btn btn-error btn-sm absolute top-2 right-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyListings;
