import React from "react";
import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Success = () => {
  useDocumentTitle("Contact Us");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-600">
          Message Sent Successfully!
        </h2>
        <p className="text-gray-600 mt-2">We will get back to you soon.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
