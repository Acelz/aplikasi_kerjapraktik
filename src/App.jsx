import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import AddUserPage from "./pages/admin/users/AddUserPage";
import UsersPage from "./pages/admin/users/UsersPage";
import VehiclePage from "./pages/user/vehicle/VehiclePage";
import AddVehiclePage from "./pages/user/vehicle/AddVehiclePage";
import DistrictPage from "./pages/admin/district/DistrictPage";
import RegencyMunicipalityPage from "./pages/admin/regency-municipality/RegencyMunicipalityPage";
import VillagePage from "./pages/admin/village/VillagePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardAdmin />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/vehicles/add" element={<AddVehiclePage />} />
        <Route path="/vehicles" element={<VehiclePage />} />
        <Route path="/districts" element={<DistrictPage />} />
        <Route
          path="/regency-municipalities"
          element={<RegencyMunicipalityPage />}
        />
        <Route path="/villages" element={<VillagePage />} />
      </Routes>
    </>
  );
}

export default App;
