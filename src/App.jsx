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
  const token = localStorage.getItem("token");
  return (
    <Routes>
      {/* <Route path="/" element={token ? <Services /> : <HomePage />} /> */}
      <Route
        path="/"
        element={token ? <ServicesPage /> : <HospitalHomepage />}
      />
      <Route path="/signin" element={token ? <ServicesPage /> : <Signin />} />
      {/* <Route path="/signin" element={<Signin />} /> */}
      <Route path="/services" element={token ? <ServicesPage /> : <Signin />} />
      {/* <Route path="/services" element={<ServicesPage />} /> */}
      <Route
        path="/departments"
        element={token ? <ViewDepartment /> : <Signin />}
      />
      <Route
        path="/add-department"
        element={token ? <AddDepartment /> : <Signin />}
      />
      <Route
        path="/bed-management"
        element={token ? <BedManagement /> : <Signin />}
      />
      <Route
        path="/check-appointment"
        element={token ? <CheckAppointment /> : <Signin />}
      />
      <Route
        path="/view-department"
        element={token ? <ViewDepartment /> : <Signin />}
      />
      <Route
        path="/manage-inventory"
        element={token ? <MedicineInventoryPage /> : <Signin />}
      />
    </Routes>
  );
}

export default App;
