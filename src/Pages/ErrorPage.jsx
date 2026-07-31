import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-5">
      <h1 className="text-9xl font-extrabold text-red-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-500 mt-2 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#fbbf24] text-white font-semibold rounded-lg transition-all duration-200"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
