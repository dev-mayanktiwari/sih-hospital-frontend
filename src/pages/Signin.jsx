import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaHospital } from "react-icons/fa";
import axios from "axios";
import BACKEND_URL from "../../baseUrl";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await axios.post(`${BACKEND_URL}/signin`, formData); // Corrected the request

        const { token } = response.data;
        localStorage.setItem("token", token);
        setIsLoading(false);
        alert("Signin successful");
        navigate("/services");
      } catch (error) {
        setIsLoading(false);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        alert(errorMessage);
        console.error("Signin error:", error);
      }
    },
    [formData, navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <FaHospital className="text-blue-600 text-4xl mb-4" />
            <h1 className="text-3xl font-bold text-center mb-2">
              Hospital Management System
            </h1>
            <p className="text-xl text-center text-gray-600">
              Sign in to manage your hospital efficiently
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-center">Sign In</h2>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
