import { Routes, Route } from "react-router-dom";
import HospitalHomepage from "./pages/Homepage";
import ServicesPage from "./pages/Services";
import AddDepartment from "./pages/AddDepartment";
import ViewDepartment from "./pages/ViewDepartment";
import BedManagement from "./pages/BedManagement";
import CheckAppointment from "./pages/CheckAppointment";
import Signin from "./pages/Signin";
import MedicineInventoryPage from "./pages/InventoryManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HospitalHomepage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/departments" element={<ViewDepartment />} />
      <Route path="/add-department" element={<AddDepartment />} />
      <Route path="/bed-management" element={<BedManagement />} />
      <Route path="/check-appointment" element={<CheckAppointment />} />
      <Route path="/view-department" element={<ViewDepartment />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/manage-inventory" element={<MedicineInventoryPage />} />
    </Routes>
  );
}

export default App;
