// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import pawImg from "../assets/pawmart.jpg";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() =>
            Swal.fire({
              icon: "success",
              title: "Logged out!",
              text: "You have been logged out successfully.",
              timer: 1500,
              showConfirmButton: false,
            })
          )
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Logout failed!",
              text: err.message,
            })
          );
      }
    });
  };

  return (
    <nav className="navbar bg-pink-100 dark:bg-gray-900 mb-2 shadow-md px-4 text-black dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pets">Pets & Supplies</Link></li>
            {user && (
              <>
                <li><Link to="/add-listing">Add Listing</Link></li>
                <li><Link to="/dashboard/my-listings">My Listings</Link></li>
                <li><Link to="/dashboard/my-orders">My Orders</Link></li>
              </>
            )}
          </ul>
        </div>
        <div className="w-10 rounded-full bg-gray-300 mr-1">
          <img src={pawImg} alt="Logo" />
        </div>
        <h1 className="font-bold text-3xl text-pink-600 dark:text-pink-400">PawMart</h1>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/pets">Pets & Supplies</Link></li>
          {user && (
            <>
              <li><Link to="/add-listing">Add Listing</Link></li>
              <li><Link to="/dashboard/my-listings">My Listings</Link></li>
              <li><Link to="/dashboard/my-orders">My Orders</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-sm btn-outline flex items-center">
          {theme === "light" ? <Moon /> : <Sun />}
          {theme === "light" ? "Dark" : "Light"}
        </button>
        {loading ? (
          <span className="loading loading-spinner loading-md text-primary"></span>
        ) : !user ? (
          <>
            <Link to="/auth/login" className="btn btn-primary btn-md text-white">Login</Link>
            <Link to="/auth/register" className="btn btn-accent btn-md text-white">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-orange-400"
              />
            </Link>
            <button onClick={handleLogout} className="btn btn-error btn-md text-white">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
