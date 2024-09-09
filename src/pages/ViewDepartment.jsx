import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]); // Ensure it's always an array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch department details on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          setDepartments(response.data); // Set departments if response is an array
        } else {
          setError("Unexpected data format from server");
        }
      } catch (err) {
        setError("An error occurred while fetching department data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Departments</h1>

      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-600">
          List of Departments
        </h2>

        <ul className="space-y-4">
          {departments && departments.length > 0 ? (
            departments.map((department) => (
              <li
                key={department.id}
                className="border p-4 rounded-md bg-gray-100 shadow-sm"
              >
                <h3 className="text-lg font-bold text-blue-600">
                  {department.name}
                </h3>

                <p className="text-gray-700">
                  Head of Department:{" "}
                  {department.head ? department.head : "Not Assigned"}
                </p>
              </li>
            ))
          ) : (
            <p>No departments available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentManagement;
