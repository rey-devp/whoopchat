import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Logging out...");
      await logout();
      localStorage.clear(); // hapus semua data
      toast.success("Logged out successfully!", { id: toastId });
      navigate("/login");
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-gray-800 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo with animation */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-gray-300 transition"
            >
              WhoopChat
            </Link>
          </motion.div>

          {/* Auth Links */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
