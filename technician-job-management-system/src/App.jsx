import './App.css';

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './Components/customer/HomePage';
import ActiveJobs from './Components/customer/ActiveJobs';
import Profile from './Components/customer/Profile';
import Quotations from './Components/customer/Quotations';
import ReqService from './Components/customer/ReqService';
import Settings from './Components/customer/Settings';
import FindTech from './Components/customer/FindTech';
import JobHistory from './Components/customer/JobHistory';
import InvoicePayment from './Components/customer/Invoice&Payment';
import Notifications from './Components/customer/Notifications';
import Logout from './Components/customer/Logout';
import Layout from './Layout';


const routers = [{
  path: "/", element: <Layout />,

  children : [{
    path: "/",  element: <Home />,
  },{
    path: "/request-service",  element: <ReqService />,
  },{
    path: "/find-technician",  element: <FindTech />,
  },{
    path: "/active-jobs",  element: <ActiveJobs />,
  },{
    path: "/quotations",  element: <Quotations />,
  },{
    path: "/invoice-payment",  element: <InvoicePayment />,
  },{
    path: "/job-history",  element: <JobHistory />,
  },{
    path: "/notifications",  element: <Notifications />,
  },{
    path: "/profile",  element: <Profile />,
  },{
    path: "/settings",  element: <Settings />,
  },{
    path: "/logout",  element: <Logout />,
  }]
}];

const router = createBrowserRouter(routers);

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
