import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Customer/Customer-sidebar";
import Topbar from './Components/customer/TopBar';


function Layout() {
  return (
    <>
    <Sidebar />
    <Outlet />
    <Topbar />

    </>
  );
}

export default Layout;