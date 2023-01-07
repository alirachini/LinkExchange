import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { GoRequestChanges } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import Logo from "../../Assets/logo.png";
import { FiLogOut } from "react-icons/fi";
import { BsChatSquareQuoteFill } from "react-icons/bs";
import Badge from './Badge'

function Navbar({userid}) {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    localStorage.removeItem("user");
    // setLoggedUser(null);
  };

  return (
    
    <div className="the-navbar">
      <img src={Logo} alt="logo" className="logo" />
      <ul class="main-nav">
        <Link to="/">
          <AiFillHome />
          <li>Home</li>
        </Link>
        <Link to="/requests">
          <BsChatSquareQuoteFill />
          <li>Requests</li>
          <Badge userid={userid}/>
        </Link>
        <Link to="/profile">
          <CgProfile />
          <li>Profile</li>
        </Link>
        <Link to="/" onClick={onLogout}>
          <FiLogOut />
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
