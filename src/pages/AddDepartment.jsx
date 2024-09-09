import axios from "axios";
import React, { useState } from "react";
import { FaBuilding, FaUserMd } from "react-icons/fa";

const AddDepartment = () => {
  const [departments, setDepartments] = useState([{ name: "", head: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDepartmentChange = (index, e) => {
    const { name, value } = e.target;
    const newDepartments = [...departments];
    newDepartments[index][name] = value;
    setDepartments(newDepartments);
  };

  const addDepartment = () => {
    setDepartments([...departments, { name: "", head: "" }]);
  };

  const removeDepartment = (index) => {
    setDepartments(departments.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/hospital/add-departments",
        { departments },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the authorization header
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Departments added successfully!");
        setDepartments([{ name: "", head: "" }]); // Clear the form after success
      } else {
        throw new Error("Failed to add departments");
      }
    } catch (err) {
      console.error("Error in adding departments", err);
      setError("An error occurred while adding the departments");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Add New Departments
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6"
      >
        {departments.map((dept, index) => (
          <div key={index} className="mb-6">
            <label
              htmlFor={`departmentName-${index}`}
              className="block text-gray-700 font-bold mb-2"
            >
              <FaBuilding className="inline mr-2 text-blue-600" />
              Department Name
            </label>
            <input
              type="text"
              id={`departmentName-${index}`}
              name="name"
              value={dept.name}
              onChange={(e) => handleDepartmentChange(index, e)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor={`headName-${index}`}
              className="block text-gray-700 font-bold mb-2 mt-4"
            >
              <FaUserMd className="inline mr-2 text-blue-600" />
              Department Head
            </label>
            <input
              type="text"
              id={`headName-${index}`}
              name="head"
              value={dept.head}
              onChange={(e) => handleDepartmentChange(index, e)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {departments.length > 1 && (
              <button
                type="button"
                onClick={() => removeDepartment(index)}
                className="text-red-500 mt-2 hover:underline"
              >
                Remove Department
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addDepartment}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Add Another Department
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-300 mt-6"
        >
          {isSubmitting ? "Adding..." : "Add Departments"}
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
