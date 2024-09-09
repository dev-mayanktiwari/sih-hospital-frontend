import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaUser, FaHospitalUser, FaListOl } from 'react-icons/fa';

const CheckAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/hospital/appointments', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAppointments(response.data); // Set the data correctly from response
                setIsLoading(false);
            } catch (err) {
                setError('An error occurred while fetching appointments');
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [token]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">{appointment.title}</h2>
                        <div className="space-y-2">
                            <p className="flex items-center text-gray-700">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                {new Date(appointment.time).toLocaleDateString()}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <FaClock className="mr-2 text-blue-500" />
                                {new Date(appointment.time).toLocaleTimeString()}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <FaUser className="mr-2 text-blue-500" />
                                {appointment.patient.name}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <FaHospitalUser className="mr-2 text-blue-500" />
                                Department ID: {appointment.departmentId}
                            </p>
                            <p className="flex items-center text-gray-700">
                                <FaListOl className="mr-2 text-blue-500" />
                                Queue Position: {appointment.queuePosition}
                            </p>
                            <p className={`mt-4 font-semibold ${appointment.status === 'Scheduled' ? 'text-green-500' : 'text-yellow-500'}`}>
                                Status: {appointment.status}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckAppointment;
