import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import WebsitesCards from "./Websites";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";

function Home({
  auth: {
    user: { first_name, email_verified_at,id },
  },
  token,
}) {
  document.title = "Home | LES";
  const [WebsitesData, setWebsitesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  // console.log(first_name);

  if (!localStorage.getItem("user")) {
    navigate("/");
  }

  const [userData, setUserData] = useState([]);

  const FetchUser = () => {
    axios
      .get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
        console.log(res.data.user_data.last_name);
      })

      .catch((error) => {
        console.error(error.message);
      });
  };

  // const onLogout = () => {
  //   navigate("/");
  //   localStorage.removeItem("user");
  //   // setLoggedUser(null);
  // };

  const onVerify = () => {
    localStorage.removeItem("user");
    // setLoggedUser(null);
  };

  // setTimeout(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //         window.location.href = "/login";
  //     }
  // }, 10);

  useEffect(() => {
    // axios
    //   .get("/user", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })

    //   .then((res) => {
    //     setUserData(res.data);
    //     console.log(res.data);
    //     console.log(res.data.user_data.last_name);
    //   })

    //   .catch((error) => {
    //     console.error(error.message);
    //   });
    FetchUser();
    FetchWebsties();
    // FetchData();
    // FetchCategories();
    // FetchGoals();
    const notify = () =>
      toast("Click here to verify your E-mail", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 10000,
      });

    notify();
  }, []);

  // Get All websites ///////////////////////////////////////////////////////////////////////////////
  // const FetchWebsties = () => {
  //     fetch(`${process.env.REACT_APP_BACKEND_URL}api/profit_goals`, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //     })
  //         .then((response) => {
  //             if (response.ok) {
  //                 return response.json();
  //             }
  //             throw response;
  //         })
  //         .then((data) => {
  //             setData(data);
  //             setLoading1(false);
  //         })
  //         .catch((error) => {
  //             console.error(error.message);
  //             setError(error);
  //         });
  // };

  // Get All Websites ///////////////////////////////////////////////////////////////////////////////
  const FetchWebsties = async () => {
    setLoading(true);
    await axios
      .get(`http://127.0.0.1:8000/api/getWebsites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setWebsitesData(res.data);
        setLoading(false);
      })

      .catch((error) => {
        setError(error);
        console.error(error.message);
      });
  };

  // if (loading || loadingCat || loading1) return <LoadingEffect />;
  if (loading) return <Spinner />;
  if (error) return "Error";
  return (
    <>
      <Navbar userid={id}/>

      <div className="home_wrapper">
        {email_verified_at === null && (
          <Link to="/send-verification">
            {" "}
            <ToastContainer onClick={onVerify} />
          </Link>
        )}

        <h2>Score: {userData.user_data.score}</h2>

        {/* {userData.map((user)=> <h2>{user.score}</h2>)} */}

        {/* {email_verified_at === null && (
          <Link to="/send-verification">You need to verify your email</Link>
        )} */}
        {/* <button className="btn show-btn" onClick={onLogout}>
          Logout
        </button> */}
        <WebsitesCards
          WebsitesData={WebsitesData}
          score={userData.user_data.score}
          email_verified_at={email_verified_at}
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
