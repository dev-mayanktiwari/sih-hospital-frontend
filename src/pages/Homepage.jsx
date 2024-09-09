import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHospital, FaMapMarkerAlt } from "react-icons/fa";

export default function HospitalHomepage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    departments: [{ name: "", head: "" }],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartmentChange = (index, e) => {
    const { name, value } = e.target;
    const newDepartments = [...formData.departments];
    newDepartments[index][name] = value;
    setFormData({ ...formData, departments: newDepartments });
  };

  const addDepartment = () => {
    setFormData({
      ...formData,
      departments: [...formData.departments, { name: "", head: "" }],
    });
  };

  const removeDepartment = (index) => {
    const newDepartments = formData.departments.filter((_, i) => i !== index);
    setFormData({ ...formData, departments: newDepartments });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/hospital/register",
        formData
      );
      if (response.data && response.data.token) {
        // Save the token to local storage
        localStorage.setItem("token", response.data.token);
        // Navigate to the services page
        navigate("/services");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          <FaHospital className="inline-block mr-2" />
          Hospital Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Hospital Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                <FaMapMarkerAlt className="inline-block mr-1" />
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Departments
            </h2>
            {formData.departments.map((dept, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center space-x-4 mb-4"
              >
                <div className="flex-grow">
                  <input
                    type="text"
                    name="name"
                    value={dept.name}
                    onChange={(e) => handleDepartmentChange(index, e)}
                    placeholder="Department Name"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    name="head"
                    value={dept.head}
                    onChange={(e) => handleDepartmentChange(index, e)}
                    placeholder="Department Head"
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDepartment(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDepartment}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Add Department
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Register Hospital
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
