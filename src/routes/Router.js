import { Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import AddAirline from "../components/admin/add-company/AddCompany";
import ManageAirline from "../components/admin/dashboard/Dashboard";
import CompanyStock from "../components/company-stock/CompanyStock";
function Router() {
  let isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
  console.log(isUserAuthenticated);
  return (
    <Routes>
      {isUserAuthenticated == null || isUserAuthenticated == "false" ? (
        <Route path="/" element={<Login />} />
      ) : (
        <>
        <Route path="/" element={<ManageAirline />} />
        <Route path="/add-company" element={<AddAirline />} />
      <Route path="/company-stock" element={<CompanyStock />} />
      </>
      )}
      
    </Routes>
  );
}

export default Router;
