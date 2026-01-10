import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const AddListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      if (value === "Pets") {
        setFormData({ ...formData, category: value, price: 0 });
      } else {
        setFormData({ ...formData, category: value });
      }
    } else if (name === "price") {
      setFormData({ ...formData, price: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/listings", formData);
      toast.success("Listing added successfully!");
      navigate("/dashboard/my-listings");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add listing");
    }
  };

  const isPet = formData.category === "Pets";

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product/Pet Name"
          className="input input-bordered w-full"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        >
          <option value="Pets">Pets</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
          required
          readOnly={isPet}
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />

        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
