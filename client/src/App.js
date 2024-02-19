import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/auth/Homepage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";
import Donar from "./pages/Dashboard/Donar";
import Hospitals from "./pages/Dashboard/Hospitals";
import Organisation from "./pages/Dashboard/Organisation";
import Consumer from "./pages/Dashboard/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Dashboard/Analytics";
import DonarList from "./pages/Admin/DonarList";
import HospitalList from "./pages/Admin/HospitalList";
import OrgList from "./pages/Admin/OrgList";
import AdminHome from "./pages/Admin/AdminHome";
const router = createBrowserRouter([
  {
    path: "/", element: <PrivateRoutes><Homepage /></PrivateRoutes>
  }, {
    path: "/login", element: <PublicRoutes><Login /></PublicRoutes>
  }, {
    path: "/register", element: <PublicRoutes><Register /></PublicRoutes>
  }, {
    path: "/donar", element: <PrivateRoutes><Donar /></PrivateRoutes>
  }, {
    path: "/hospital", element: <PrivateRoutes><Hospitals /></PrivateRoutes>
  }, {
    path: "/organisation", element: <PrivateRoutes><Organisation /></PrivateRoutes>
  }, {
    path: "/consumers", element: <PrivateRoutes><Consumer /></PrivateRoutes>
  }, {
    path: "/donation", element: <PrivateRoutes><Donation /></PrivateRoutes>
  }, {
    path: "/analytics", element: <PrivateRoutes><Analytics /></PrivateRoutes>
  }, {
    path: "/donar-list", element: <PrivateRoutes><DonarList /></PrivateRoutes>
  }, {
    path: "/hospital-list", element: <PrivateRoutes><HospitalList /></PrivateRoutes>
  }, {
    path: "/org-list", element: <PrivateRoutes><OrgList /></PrivateRoutes>
  }, {
    path: "/admin", element: <PrivateRoutes><AdminHome /></PrivateRoutes>
  }
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
