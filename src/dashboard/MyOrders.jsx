import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "../components/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/api/orders?email=${user.email}`)
      .then((res) => setOrders(res.data))
      .catch(() => toast.error("Failed to fetch orders"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (orderId) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this order? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:5000/api/orders/${orderId}`)
        .then(() => {
          toast.success("Order deleted successfully!");
          setOrders((prev) => prev.filter((order) => order._id !== orderId));
        })
        .catch(() => toast.error("Failed to delete order"));
    }
  };

  const handleDownload = () => {
    if (!orders.length) return toast.error("No orders to export");

    const doc = new jsPDF();
    doc.text("My Orders Report", 14, 20);
    const tableColumn = [
      "Listing Name",
      "Category",
      "Quantity",
      "Price",
      "Address",
      "Pickup Date",
      "Phone",
      "Notes",
    ];
    const tableRows = [];

    orders.forEach((order) => {
      const orderData = [
        order.listingName,
        order.category || "N/A",
        order.quantity,
        order.price ? `৳${order.price}` : "Free",
        order.address,
        order.date,
        order.phone,
        order.notes || "",
      ];
      tableRows.push(orderData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save(`MyOrders_${new Date().toISOString()}.pdf`);
  };

  if (!user)
    return (
      <p className="text-center mt-10">Please login to see your orders.</p>
    );
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!orders.length)
    return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <button onClick={handleDownload} className="btn btn-primary mb-4">
        Download Report
      </button>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Listing Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Address</th>
              <th>Pickup Date</th>
              <th>Phone</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.listingName}</td>
                <td>{order.category || "N/A"}</td>
                <td>{order.quantity}</td>
                <td>{order.price ? `৳${order.price}` : "Free"}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.phone}</td>
                <td>{order.notes || ""}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default MyOrders;
