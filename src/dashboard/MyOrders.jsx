// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "react-hot-toast";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";


// const MyOrders = () => {
//   const { user } = useAuth();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const MySwal = withReactContent(Swal);

 
//   useEffect(() => {
//     if (!user) return;

//     axios
//       .get(`http://localhost:5000/api/orders?email=${user.email}`)
//       .then((res) => setOrders(res.data))
//       .catch((err) => toast.error("Failed to fetch orders"))
//       .finally(() => setLoading(false));
//   }, [user]);

//   const handleDelete = async (orderId) => {
//     const result = await MySwal.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this order? This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (result.isConfirmed) {
//       axios
//         .delete(`http://localhost:5000/api/orders/${orderId}`)
//         .then(() => {
//           toast.success("Order deleted successfully!");
//           setOrders((prev) => prev.filter((order) => order._id !== orderId));
//         })
//         .catch(() => toast.error("Failed to delete order"));
//     }
//   };

//   if (!user)
//     return (
//       <p className="text-center mt-10">Please login to see your orders.</p>
//     );
//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!orders.length)
//     return <p className="text-center mt-10">No orders yet.</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">My Orders</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {orders.map((order) => (
//           <div
//             key={order._id}
//             className="card bg-base-100 shadow-md p-4 relative"
//           >
//             <h3 className="text-xl font-bold">{order.listingName}</h3>
//             <p>Category: {order.category || "N/A"}</p>
//             <p>Quantity: {order.quantity}</p>
//             <p>
//               Price: {order.price ? `৳${order.price.toLocaleString()}` : "Free"}
//             </p>
//             <p>Address: {order.address}</p>
//             <p>Pickup Date: {order.date}</p>
//             <p>Phone: {order.phone}</p>
//             {order.notes && <p>Notes: {order.notes}</p>}

//             <button
//               onClick={() => handleDelete(order._id)}
//               className="btn btn-error btn-sm absolute top-2 right-2"
//             >
//               Delete
//             </button>
            
//           </div>
          
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;
