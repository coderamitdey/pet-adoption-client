import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
