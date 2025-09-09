/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../store/useAuth";
import { useAlert } from "../../store/AlertContext";
import api from "../../services/axios.service";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function LoginPage() {
  const { login } = useAuth();
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      showAlert("warning", "Username & password required!");
      return;
    }

    try {
      let result = await api.post("/auth/login", formData);
      let userLogin = result.data.data;
      let user = userLogin.user;
      let token = userLogin.token;
      login(user, token);
      showAlert("success", "Login Successfully!");

      // Trigger fade out
      setIsLeaving(true);

      // Navigate after fade out
      setTimeout(() => {
        navigate({ to: "/" });
      }, 400); // durasi fade out harus sama dengan transition
    } catch (error) {
      console.log(error?.response?.data?.message);
      showAlert("error", "Login failed!");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Box Login */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-3xl shadow-2xl p-10 md:w-full max-w-sm md:max-w-md text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLeaving ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="title flex flex-col items-center mb-8">
          <img src="/icons/latte-art.png" className="w-20 mb-2" alt="Logo" />
          <h1 className="text-xl font-extrabold text-center tracking-wide">
            AWALAN
          </h1>
          <p className="text-gray-500 text-sm">Specialty Coffee | Cozy Place</p>
        </div>

        {/* Input Username */}
        <div className="relative mb-5">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm text-gray-900 placeholder-gray-400 transition"
          />
        </div>

        {/* Input Password */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm text-gray-900 placeholder-gray-400 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* Tombol Login */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-teal-500 transition-all"
        >
          Login
        </button>
      </motion.form>

      {/* Copyright */}
      <p className="mt-8 text-sm text-gray-400">
        © 2025 AWALAN COFFEE | Specialty Coffee
      </p>
    </div>
  );
}
