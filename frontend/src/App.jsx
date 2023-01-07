import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import "./Components/Login/Login";
import  EditProfile from "./Components/Profile/EditProfile"
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import axios from "axios";
import Home from "./Components/Home/Home";
import Forget from "./Components/Forget & Reset/Forget";
import Reset from "./Components/Forget & Reset/Reset";
import Verify from "./Components/Verify/Verify";
import Requests from "./Components/Requests/Requests";
import ViewRequest from "./Components/Requests/ViewRequest";
import SendVerify from "./Components/Verify/SendVerify";
import Request from "./Components/Backlink/Request/Request";
import AddWebsite from './Components/Profile/AddWebsite'
import Profile from './Components/Profile/Profile'

function App() {
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` }
  // };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  /**
   * Auth State for Admin Credentials & Token
   */
  const [auth, setAuth] = useState(user ? user : null);
  const token = user ? user.token : "";
  console.log(auth);

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login auth={auth} setAuth={setAuth} />} />
          <Route path="/register" element={<Register setAuth={setAuth} />} />
          <Route
            path="/home"
            element={<Home auth={auth} token={token} user={user} />}
          />
          <Route path="/add-website" element={<AddWebsite auth={auth} />} />
          <Route
            path="/profile"
            element={<Profile auth={auth} token={token} />}
          />
          <Route path="/forget" element={<Forget auth={auth} />} />
          <Route path="/reset" element={<Reset auth={auth} />} />
          <Route path="/verify-account" element={<Verify />} />
          <Route path="/send-verification" element={<SendVerify />} />
          <Route exact path="/requests" element={<Requests auth={auth} />} />
           <Route exact path="/editProfile" element={<EditProfile auth={auth} />} />
          <Route
            exact
            path="/request/:id/:dr"
            element={<Request auth={auth} token={token} />}
          />
          <Route exact path="/viewrequest" element={<ViewRequest auth={auth} />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
