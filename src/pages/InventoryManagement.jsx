import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../baseUrl.js";
import { formatDateForBackend, formatDateForDisplay } from "../utils/date.js";

const API_BASE_URL = BACKEND_URL;

export default function MedicineInventoryPage() {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchMedicines();
    } else {
      setError("No token found. Please log in.");
      setIsLoading(false);
    }
  }, [token]);

  const fetchMedicines = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/view-medicine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const formattedMedicines = response.data.map((medicine) => ({
        ...medicine,
        expiryDate: formatDateForDisplay(medicine.expiryDate),
      }));
      setMedicines(formattedMedicines);
      setIsLoading(false);
    } catch (err) {
      console.log("Error in fetching medicine", err);
      setError("Failed to fetch medicines. Please try again later.");
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleUpdate = async (id) => {
    try {
      const medicineToUpdate = medicines.find((m) => m.id === id);
      const updatedMedicine = {
        ...medicineToUpdate,
        expiryDate: formatDateForBackend(medicineToUpdate.expiryDate),
      };
      await axios.put(`${API_BASE_URL}/edit-medicine/${id}`, updatedMedicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingId(null);
      setMessage("Medicine updated successfully");
      setTimeout(() => setMessage(""), 3000);
      fetchMedicines();
    } catch (err) {
      console.log("Error in updating medicine", err);
      setError("Failed to update medicine. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-medicine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMedicines(medicines.filter((m) => m.id !== id));
      setMessage("Medicine deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log("Error in deleting medicine", err);
      setError("Failed to delete medicine. Please try again.");
    }
  };

  const handleAddNew = async () => {
    try {
      const medicineToAdd = {
        ...newMedicine,
        expiryDate: formatDateForBackend(newMedicine.expiryDate),
      };
      const response = await axios.post(
        `${API_BASE_URL}/add-medicine`,
        medicineToAdd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicines([
        ...medicines,
        {
          ...response.data,
          expiryDate: formatDateForDisplay(response.data.expiryDate),
        },
      ]);
      setNewMedicine({ name: "", quantity: "", expiryDate: "" });
      setMessage("New medicine added successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log("Error in adding medicine", err);
      setError("Failed to add new medicine. Please try again.");
    }
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    if (id) {
      setMedicines(
        medicines.map((m) => (m.id === id ? { ...m, [name]: value } : m))
      );
    } else {
      setNewMedicine({ ...newMedicine, [name]: value });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">Loading medicine inventory...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">
          Medicine Inventory
        </h1>
        {message && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{message}</span>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Expiry Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{medicine.id}</td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      name="name"
                      value={medicine.name}
                      onChange={(e) => handleInputChange(e, medicine.id)}
                      disabled={editingId !== medicine.id}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      name="quantity"
                      value={medicine.quantity}
                      onChange={(e) => handleInputChange(e, medicine.id)}
                      disabled={editingId !== medicine.id}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="date"
                      name="expiryDate"
                      value={medicine.expiryDate}
                      onChange={(e) => handleInputChange(e, medicine.id)}
                      disabled={editingId !== medicine.id}
                      className="w-full bg-transparent"
                    />
                  </td>
                  <td className="py-3 px-4">
                    {editingId === medicine.id ? (
                      <button
                        onClick={() => handleUpdate(medicine.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(medicine.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(medicine.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Add New Medicine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={newMedicine.name}
              onChange={(e) => handleInputChange(e)}
              placeholder="Medicine Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              name="quantity"
              value={newMedicine.quantity}
              onChange={(e) => handleInputChange(e)}
              placeholder="Quantity"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              name="expiryDate"
              value={newMedicine.expiryDate}
              onChange={(e) => handleInputChange(e)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add New Medicine
          </button>
        </div>
      </div>
    </div>
  );
}
