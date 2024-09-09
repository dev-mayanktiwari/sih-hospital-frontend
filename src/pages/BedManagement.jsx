import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBed, FaCheckCircle } from 'react-icons/fa';

const BedManagement = () => {
    const [totalBeds, setTotalBeds] = useState('');
    const [availableBeds, setAvailableBeds] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Fetch bed details on component mount
    useEffect(() => {
        const fetchBedData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                const response = await axios.get('http://localhost:3000/api/v1/hospital/get-bed-details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status === 200) {
                    const { totalBed, availableBed } = response.data.details;
                    setTotalBeds(totalBed.toString());
                    setAvailableBeds(availableBed.toString());
                    setIsLoading(false);
                }
            } catch (err) {
                setError('An error occurred while fetching bed data');
                setIsLoading(false);
            }
        };

        fetchBedData();
    }, []);

    // Handle form submission to update bed details
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(null);

        try {
            const token = localStorage.getItem('token'); // Get token from local storage
            const response = await axios.post(
                'http://localhost:3000/api/v1/hospital/update-bed-details',
                {
                    totalBed: parseInt(totalBeds),
                    availableBed: parseInt(availableBeds),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setSuccess('Bed information updated successfully!');
            }
        } catch (err) {
            setError('An error occurred while updating bed information');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Bed Management</h1>
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="totalBeds" className="block text-gray-700 font-bold mb-2">
                            <FaBed className="inline mr-2 text-blue-600" />
                            Total Number of Beds
                        </label>
                        <input
                            type="number"
                            id="totalBeds"
                            value={totalBeds}
                            onChange={(e) => setTotalBeds(e.target.value)}
                            required
                            min="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="availableBeds" className="block text-gray-700 font-bold mb-2">
                            <FaCheckCircle className="inline mr-2 text-blue-600" />
                            Number of Available Beds
                        </label>
                        <input
                            type="number"
                            id="availableBeds"
                            value={availableBeds}
                            onChange={(e) => setAvailableBeds(e.target.value)}
                            required
                            min="0"
                            max={totalBeds}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-300"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Bed Information'}
                    </button>
                </form>
            </div>
            <div className="mt-8 max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 text-blue-600">Current Bed Status</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-700 font-bold">Total Beds</p>
                        <p className="text-2xl text-blue-600">{totalBeds}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-700 font-bold">Available Beds</p>
                        <p className="text-2xl text-blue-600">{availableBeds}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BedManagement;
