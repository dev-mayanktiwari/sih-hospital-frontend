import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FaPlus, FaEye, FaCalendarCheck, FaExchangeAlt, FaBoxes, FaPills, FaBed } from 'react-icons/fa';

// Placeholder components for each service
const AddDepartment = () => <h2>Add Department</h2>;
const ViewDepartment = () => <h2>View Department</h2>;
const CheckAppointment = () => <h2>Check Appointment Status</h2>;
const ChangeAppointment = () => <h2>Change Appointment Status</h2>;
const ManageInventory = () => <h2>Manage Inventory</h2>;
const MedicationServices = () => <h2>Medication Services</h2>;
const BedManagement = () => <h2>Bed Management</h2>;

const ServiceCard = ({ icon: Icon, title, description, to }) => (
    <Link to={to} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="flex items-center mb-4">
            <Icon className="text-3xl text-blue-600 mr-4" />
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </Link>
);

const ServicesPage = () => {
    return (

        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-blue-600">Hospital Services</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={
                        <div className="px-4 py-6 sm:px-0">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ServiceCard
                                    icon={FaPlus}
                                    title="Add Department"
                                    description="Create a new department in the hospital."
                                    to="/add-department"
                                />
                                <ServiceCard
                                    icon={FaEye}
                                    title="View Department"
                                    description="View details of existing departments."
                                    to="/view-department"
                                />
                                <ServiceCard
                                    icon={FaCalendarCheck}
                                    title="Check Appointment Status"
                                    description="Check the status of scheduled appointments."
                                    to="/check-appointment"
                                />
                                <ServiceCard
                                    icon={FaExchangeAlt}
                                    title="Change Appointment Status"
                                    description="Update or modify appointment statuses."
                                    to="/change-appointment"
                                />
                                <ServiceCard
                                    icon={FaBoxes}
                                    title="Manage Inventory"
                                    description="Oversee and manage hospital inventory."
                                    to="/manage-inventory"
                                />
                                <ServiceCard
                                    icon={FaPills}
                                    title="Medication Services"
                                    description="Manage and track medication services."
                                    to="/medication-services"
                                />
                                <ServiceCard
                                    icon={FaBed}
                                    title="Bed Management"
                                    description="Monitor and manage hospital bed occupancy."
                                    to="/bed-management"
                                />
                            </div>
                        </div>
                    } />
                    <Route path="/add-department" element={<AddDepartment />} />
                    <Route path="/view-department" element={<ViewDepartment />} />
                    <Route path="/check-appointment" element={<CheckAppointment />} />
                    <Route path="/change-appointment" element={<ChangeAppointment />} />
                    <Route path="/manage-inventory" element={<ManageInventory />} />
                    <Route path="/medication-services" element={<MedicationServices />} />
                    <Route path="/bed-management" element={<BedManagement />} />
                </Routes>
            </main>
        </div>

    );
};

export default ServicesPage;