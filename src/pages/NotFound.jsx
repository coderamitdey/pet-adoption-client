import React, { useEffect } from "react";
import { Link } from "react-router";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        ← Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
