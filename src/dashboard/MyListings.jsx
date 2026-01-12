import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const MyListings = ({ onUpdate }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    category: "",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
  });

  const fetchListings = () => {
    axios
      .get(
        `https://pet-adoption-server-eta-eight.vercel.app/api/my-listings?email=${user.email}`
      )
      .then((res) => setListings(res.data));
  };

  useEffect(() => {
    fetchListings();
  }, [user.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This listing will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://pet-adoption-server-eta-eight.vercel.app/api/listings/${id}`
          )
          .then(() => {
            setListings(listings.filter((i) => i._id !== id));
            Swal.fire("Deleted!", "Your listing has been deleted.", "success");
            if (onUpdate) onUpdate();
          });
      }
    });
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://pet-adoption-server-eta-eight.vercel.app/api/listings/${editData._id}`,
        editData
      );
      setListings((prev) =>
        prev.map((item) => (item._id === editData._id ? editData : item))
      );
      setShowModal(false);
      Swal.fire("Updated!", "Listing updated successfully", "success");
      if (onUpdate) onUpdate();
    } catch {
      Swal.fire("Error!", "Failed to update listing", "error");
    }
  };

  if (!listings.length)
    return <p className="text-center mt-10">No listings added yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Location</th>
            <th>Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price ? `৳${item.price.toLocaleString()}` : "Free"}</td>
              <td>{item.location}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="h-20 w-20 object-cover rounded-md"
                />
              </td>
              <td className="flex flex-col gap-1">
                <button
                  onClick={() => handleEditClick(item)}
                  className="btn btn-info btn-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h3 className="text-2xl font-bold mb-4">Update Listing</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="category"
                value={editData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Price"
                required
              />
              <input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Location"
                required
              />
              <input
                type="date"
                name="date"
                value={editData.date}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                required
              />
              <input
                type="text"
                name="image"
                value={editData.image}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Image URL"
                required
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
