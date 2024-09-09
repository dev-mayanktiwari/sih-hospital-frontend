import React, { useState, useEffect } from 'react';
import { FaBuilding, FaUserMd } from 'react-icons/fa';

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/departments');
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while fetching departments');
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Hospital Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <FaBuilding className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-xl font-semibold text-gray-800">{dept.name}</h2>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <FaUserMd className="mr-2 text-blue-600" />
                Head: {dept.head}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDepartment;