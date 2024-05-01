import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";
import DashboardAdmin from "./admin/dashboard/DashboardAdmin";
import DashboardSuperadmin from "./superadmin/dashboard/DashboardSuperadmin";
import DashboardUser from "./user/dashboard/DashboardUser";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Determine which dashboard to render based on the user role
  const getDashboardComponent = (role) => {
    switch (role) {
      case "admin":
        return <DashboardAdmin />;
      case "superadmin":
        return <DashboardSuperadmin />;
      default:
        return <DashboardUser />;
    }
  };

  const dashboard = user ? getDashboardComponent(user.role) : null;

  return <>{dashboard}</>;
};

export default Dashboard;
