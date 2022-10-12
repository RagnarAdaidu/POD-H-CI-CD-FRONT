import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateProfileForm from "./pages/updateprofile/UpdateProfileForm";
import Login from "./components/Login/Login";
import CardT from "../src/pages/updateprofile/CardT";
import ProtectedRoute from "./ProtectedRoute";
import { Signup } from "./components/Signup/Signup";
import CheckMail from "./pages/Checkmail/CheckMail";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Landingpage from "./pages/Landingpage";
import Dashboard from "./components/dashboard/dashboard";
// import TransactionHistory from "./transaction-history/TransactionHistory";
import Layout from "./components/dashboard/Admin/Layout/Layout";
import Overview from "./components/dashboard/Admin/Overview/Overview";
import Transactions from "./components/dashboard/Admin/Transactions/Transactions";
import Navbar from "./components/Navbar/NavBar";
import Tester from "./components/dashboard/WithdrawBalance/Tester";

function App() {
  const handleIMGcLICK = (e) => {
    e.preventDefault();
    alert("Hello");
  };
  return (
    <div>
      <Router>
        <Navbar onClick={handleIMGcLICK} />{" "}
        <Routes>
          {" "}
          {/* <Route exact path="/history" element={<TransactionHistory />} />{" "} */}{" "}
          <Route exact path="/card" element={<CardT />} />{" "}
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          <Route path="/" element={<Landingpage />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route exact path="/login" element={<Login />} />{" "}
          <Route path="/checkmail" element={<CheckMail />} />{" "}
          <Route path="/forgetpassword" element={<ForgetPassword />} />{" "}
          <Route path="/forgetpassword/:id" element={<ResetPassword />} />{" "}
          <Route path="/test" element={<Tester />} />{" "}
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <UpdateProfileForm />
              </ProtectedRoute>
            }
          />{" "}
          <Route
            exact
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route exact path="/" element={<Overview />} />{" "}
                    <Route
                      exact
                      path="/transactions"
                      element={<Transactions />}
                    />{" "}
                  </Routes>{" "}
                </Layout>{" "}
              </ProtectedRoute>
            }
          />{" "}
        </Routes>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
