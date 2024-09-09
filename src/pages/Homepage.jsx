import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHospital, FaPlus } from 'react-icons/fa';

const initialDepartments = [
  "Emergency",
  "Surgery",
  "Pediatrics",
  "Cardiology",
  "Neurology",
];

export default function HospitalHomepage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    departments: [],
  });
  const [newDepartment, setNewDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleDepartmentChange = useCallback((department) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(department)
        ? prev.departments.filter(d => d !== department)
        : [...prev.departments, department]
    }));
  }, []);

  const handleAddDepartment = useCallback(() => {
    if (newDepartment && !formData.departments.includes(newDepartment)) {
      setFormData(prev => ({
        ...prev,
        departments: [...prev.departments, newDepartment]
      }));
      setNewDepartment('');
    }
  }, [newDepartment, formData.departments]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsLoading(false);
      alert("Registration Successful! Welcome to our Hospital Management System!");
      navigate('/services');
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred during registration. Please try again.");
      console.error("Registration error:", error);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center mb-8">
            <FaHospital className="text-blue-600 text-4xl mb-4" />
            <h1 className="text-3xl font-bold text-center mb-2">Hospital Management System</h1>
            <p className="text-xl text-center text-gray-600">Register your hospital and start managing efficiently</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hospital Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {initialDepartments.map((department) => (
                  <label key={department} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={formData.departments.includes(department)}
                      onChange={() => handleDepartmentChange(department)}
                    />
                    <span className="ml-2 text-gray-700">{department}</span>
                  </label>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-grow px-3 py-2 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add custom department"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleAddDepartment}
                >
                  <FaPlus />
                </button>
              </div>
              {formData.departments.length > initialDepartments.length && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Custom Departments:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.departments.slice(initialDepartments.length).map((dept, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register Hospital"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}