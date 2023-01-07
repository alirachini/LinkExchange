import React, {useState, useEffect} from "react";
import "./Profile.css";
import axios from "axios";
import Navbar from '../Navbar/Navbar'
import UserWebsites from "./UserWebsites";
import Footer from "../Footer/Footer";



function Profile({auth:{ user: {id, first_name, score, email_verified_at}, token }}) {
    const [UserWebsitesData, setUserWebsitesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transID, setTransID] = useState(null);
    const [websites, setWebsites] = useState(false);


    // setTimeout(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         window.location.href = "/login";
    //     }
    // }, 10);

    // useEffect(() => {
    //     FetchUserWebsites();
    //     // FetchData();
    //     // FetchCategories();
    //     // FetchGoals();
    //
    // }, []);

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
    const FetchUserWebsites = async () => {
        setLoading(true);
        try {
            const response = await axios
                .get(`http://127.0.0.1:8000/api/getWebsites/${id}`, {
                    headers: {"Content-Type": "multipart/form-data"},
                });
            if (response) {
                setUserWebsitesData(response.data);
                setLoading(false);
            }
        } catch (e) {
            setError(e);
            console.error(e.message);
        }
    };
    // Delete Transactions ///////////////////////////////////////////////////////////////////
    const DeleteWebsite = async () => {
        setLoading(true);
        await axios.delete(`http://127.0.0.1:8000/api/deleteWebsite/${transID}`)
            .then((res) => {
                setWebsites(!websites);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                console.error(error.message)
            });
    };
    // if (loading || loadingCat || loading1) return <LoadingEffect />
    if (error) return "Error";
    return (
        <>
            <Navbar userid={id}/>


            <div className="Profile_wrapper">
                <UserWebsites
                    UserWebsitesData={UserWebsitesData}
                    FetchUserWebsites={FetchUserWebsites}
                    loadingProfile={loading}
                    websites={websites}
                    setTransID={setTransID}
                    setWebsites={setWebsites}
                    DeleteWebsite={DeleteWebsite}
                    UserId={id}
                    token={token}
                />

            </div>


        </>
    );
}

export default Profile;