import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./Profile.css";
import Popup from "../Popup/Popup";
import {MdOutlineDelete} from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import axios from 'axios';
import Spinner from "../Spinner/Spinner"
import Footer from "../Footer/Footer";


function UserWebsites({
                          UserWebsitesData,
                          FetchUserWebsites,
                          loadingProfile,
                          DeleteWebsite,
                          setTransID,
                          websites,
                          setWebsites,
                          token,

}) {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [websiteUrlEdit, setWebsiteUrlEdit] = useState("");
    const [timeToAddEdit, setTimeToAddEdit] = useState("");
    const [sampleUrlEdit, setSampleUrlEdit] = useState("");
    const [webID, setwebID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editPopup, setEditPopup] = useState(false);


    const [userData, setUserData] = useState([]);

    const FetchScore = () => {
      axios
        .get("/user-score", {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then((res) => {
          setUserData(res.data);
          console.log(res.data);
          console.log(res.data.user_score);
        })

        .catch((error) => {
          console.error(error.message);
        });
    };

    const [popupCur, setPopupCur] = useState(false);
    const navigateToAddWebsite = (UserId) => {
        // 👇️ navigate to / add website
        navigate('/add-website');
    };
    const navigateToEditProfile = (UserId) => {
        // 👇️ navigate to / add website
        navigate('/editProfile');
    };

    useEffect(()=> {
        FetchScore()
        FetchUserWebsites();
    }, [websites])
    const EditWebsite = async () => {
        setLoading(true);
        await axios.put(`http://127.0.0.1:8000/api/editWebsites/${webID}?website_url=${websiteUrlEdit}&time_to_add=${timeToAddEdit}&sample_url=${sampleUrlEdit}`)
            .then((res) => {
                setWebsites(!websites);
                setLoading(false);
            })

            .catch((error) => {
                setError(error);
                console.error(error.message)
            });

    };


    if (loadingProfile) return <Spinner />;
    return (
        <>
            <div className="profile_info">
                <button className='buttons add_website_button' onClick={navigateToAddWebsite}>Add Website
                </button>
                <h2 className="profile_score">Score : {userData.user_score} </h2>
                <button className='buttons edit_profile' onClick={navigateToEditProfile}>Edit Profile
                </button>
            </div>

            <div className="container-cardss">

                {UserWebsitesData[0].map((item) => {
                    return (
                        <div key={item.id} className="container-cardss">
                            <div className="cardss">
                                <div className="cardss-i">
                                    <h3>URL : {item.website_url}</h3>
                                    <div className="numberr">
                                        <p style={{textAlign: "start"}}>Time to Add : {item.time_to_add}</p>
                                        <p style={{textAlign: "end", marginLeft: "150px"}}>Domain Rating
                                            : {item.domain_rating}</p>
                                        <div className="website_edit_delete">
                                            <button className='profile_web_edit'
                                                    onClick={() => {
                                                        setEditPopup(true);
                                                        setWebsiteUrlEdit(item.website_url);
                                                        setTimeToAddEdit(item.time_to_add);
                                                        setSampleUrlEdit(item.sample_url);
                                                        setwebID(item.id);
                                                    }}><BiEdit/>
                                            </button>
                                            <MdOutlineDelete
                                                className='profile_web_edit'
                                                onClick={() => {
                                                    setTransID(item.id);
                                                    setPopupCur(true);
                                                }}
                                            />
                                            <Popup trigger={popupCur} setTrigger={setPopupCur}>
                                                <h3>Are you sure you want to delete this Website?</h3><br/>
                                                <button className='profile_web_edit' onClick={() => {
                                                    DeleteWebsite();
                                                    setPopupCur(false);
                                                }}>Yes
                                                </button>

                                            </Popup>

                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>



                    );
                })}

            </div>
            <Popup trigger={editPopup} setTrigger={setEditPopup}>
                <div className="popup_title">

                    <h3>Edit Website</h3>
                </div>
                <form onSubmit={() => {
                    setEditPopup(false);
                    EditWebsite()
                }}>
                    <div className="form-group">
                        <div className='EditWebsite_label'>
                            <label>Website URL:</label>
                            <input
                                type="text"
                                name="websiteUrl"
                                id="websiteUrl"
                                placeholder="URL"
                                value={websiteUrlEdit}
                                className='EditWebsite_input'
                                onChange={(e) => {
                                    setWebsiteUrlEdit(e.target.value)
                                }}
                                required

                            /></div>
                        <div className='EditWebsite_label'>
                            <label>Time to add:</label>
                            <input
                                type="text"
                                name="desc"
                                id="desc"
                                placeholder="time"
                                className='EditWebsite_input'
                                value={timeToAddEdit}
                                onChange={(e) => {
                                    setTimeToAddEdit(e.target.value)
                                }}
                                required

                            /></div>
                        <div className='EditWebsite_label'>
                            <label>Sample URL:</label>
                            <input
                                type="text"
                                name="sampleUrl"
                                id="sampleUrl"
                                placeholder="sample URL"
                                className='EditWebsite_input'
                                value={sampleUrlEdit}
                                onChange={(e) => {
                                    setSampleUrlEdit(e.target.value)
                                }}
                                required

                            />
                        </div>
                        <input
                            type="submit"
                            className="confirm_btn"
                            value="Confirm"
                        />
                    </div>
                </form>
            </Popup>

        </>
    );
}

export default UserWebsites;