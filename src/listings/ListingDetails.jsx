import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderData, setOrderData] = useState({
    buyerName: "",
    email: "",
    listingId: "",
    listingName: "",
    quantity: 1,
    price: 0,
    address: "",
    date: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (listing && user) {
      setOrderData({
        buyerName: user.displayName || "",
        email: user.email || "",
        listingId: listing._id,
        listingName: listing.name,
        quantity: 1,
        price: listing.price || 0,
        address: "",
        date: "",
        phone: "",
        notes: "",
      });
    }
  }, [listing, user]);

  const handleChange = (e) => {
    setOrderData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/orders", orderData)
      .then(() => {
        toast.success("Order placed successfully!");
        setShowOrderModal(false);
      })
      .catch(() => toast.error("Failed to place order"));
  };

  if (!listing) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="card bg-base-100 shadow-lg p-4">
        <figure>
          <img
            src={listing.image || "https://via.placeholder.com/400x300"}
            alt={listing.name}
            className="w-full h-80 object-cover rounded-md"
          />
        </figure>
        <div className="card-body">
          <h2 className="text-3xl font-bold">{listing.name}</h2>
          <p className="text-gray-600">Category: {listing.category}</p>
          <p className="text-gray-600">Owner Email: {listing.email || "N/A"}</p>
          <p className="text-gray-600">Location: {listing.location}</p>
          <p className="text-gray-600">
            Price: {listing.price ? `৳${listing.price.toLocaleString()}` : "Free for Adoption"}
          </p>
          <p className="mt-2">{listing.description}</p>

          <button
            className="btn btn-primary mt-4"
            onClick={() => setShowOrderModal(true)}
          >
            Adopt / Order Now
          </button>
        </div>
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h3 className="text-2xl font-bold mb-4">Place Your Order</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="buyerName"
                value={orderData.buyerName}
                readOnly
                className="input input-bordered w-full"
                placeholder="Buyer Name"
              />
              <input
                type="email"
                name="email"
                value={orderData.email}
                readOnly
                className="input input-bordered w-full"
                placeholder="Email"
              />
              <input
                type="text"
                name="listingId"
                value={orderData.listingId}
                readOnly
                className="input input-bordered w-full"
                placeholder="Listing ID"
              />
              <input
                type="text"
                name="listingName"
                value={orderData.listingName}
                readOnly
                className="input input-bordered w-full"
                placeholder="Listing Name"
              />
              <input
                type="number"
                name="quantity"
                value={orderData.quantity}
                onChange={handleChange}
                readOnly={
                  listing.category.toLowerCase() === "dog" ||
                  listing.category.toLowerCase() === "cat"
                }
                className="input input-bordered w-full"
                placeholder="Quantity"
              />
              <input
                type="text"
                name="price"
                value={`৳${orderData.price.toLocaleString()}`}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                value={orderData.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
                required
              />
              <input
                type="date"
                name="date"
                value={orderData.date}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                name="phone"
                value={orderData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Phone"
                required
              />
              <textarea
                name="notes"
                value={orderData.notes}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Additional Notes"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
