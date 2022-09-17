import logo from "./logo.svg";
import "./App.css";
import Sharevideos from "./pages/Sharevideos/Sharevideos";
import Header from "./pages/Shared/Header/Header";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import RequireAuth from "./RequireAuth/RequireAuth";

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home/Home";
import Userdashboard from "./pages/UserDashboard/Userdashboard";
function App() {
  return (
    <div className="">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Userdashboard></Userdashboard>
            </RequireAuth>
          }
        ></Route>

        <Route
          path="share"
          element={
            <RequireAuth>
              <Sharevideos></Sharevideos>
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
