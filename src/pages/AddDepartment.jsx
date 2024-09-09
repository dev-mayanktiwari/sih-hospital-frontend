import React, { useState } from 'react';
import { FaBuilding, FaUserMd } from 'react-icons/fa';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [headName, setHeadName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: departmentName,
          head: headName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add department');
      }

      setSuccess('Department added successfully!');
      setDepartmentName('');
      setHeadName('');
    } catch (err) {
      setError('An error occurred while adding the department');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Add New Department</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="departmentName" className="block text-gray-700 font-bold mb-2">
            <FaBuilding className="inline mr-2 text-blue-600" />
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="headName" className="block text-gray-700 font-bold mb-2">
            <FaUserMd className="inline mr-2 text-blue-600" />
            Department Head
          </label>
          <input
            type="text"
            id="headName"
            value={headName}
            onChange={(e) => setHeadName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-300"
        >
          {isSubmitting ? 'Adding...' : 'Add Department'}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;