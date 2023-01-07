import React, {useState} from "react";
import "./AddWebsite.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Spinner from "../Spinner/Spinner"
import swal from 'sweetalert';
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


function AddWebsite({auth:{ user: {id} }}) {

    const navigate = useNavigate();
    const [message, setMessage] = useState('Read more');

    const [addWebsiteUrl, setaddWebsiteUrl] = useState("");
    const [AddTimeToAdd, setAddTimeToAdd] = useState("");
    const [AddSampleUrl, setAddSampleUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function myFunction() {

        let dots = document.getElementById("dots");
        let moreText = document.getElementById("more");
        let btnText = document.getElementById("myBtn");

        if (dots.style.display === "none") {
            setMessage('Read more');
            dots.style.display = "inline";
            btnText.innerHTML = "Read more";
            moreText.style.display = "none";
        } else {
            setMessage('Read less');
            dots.style.display = "none";
            btnText.innerHTML = "Read less";
            moreText.style.display = "inline";
        }
    }

    const navigateToProfile = () => {
        // 👇️ navigate to / profile
        navigate('/profile');
    };


    // Add new website ///////////////////////////////////////////////////////////////////////////////
    const AddWebsite = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`http://127.0.0.1:8000/api/addWebsites?user_id=${id}&website_url=${addWebsiteUrl}&time_to_add=${AddTimeToAdd}&sample_url=${AddSampleUrl}&domain_rating=70`,
        )
            .then((res) => {
                setaddWebsiteUrl("");
                setAddTimeToAdd("");
                setAddSampleUrl("");
                setLoading(false);
                swal({
                    title: "Website Added Successfully!",
                    icon: "success",
                    button: "Done!",
                  });
            })

            .catch((error) => {
                setError(error);
                console.error(error.message)
            });

    };

    if (loading) return <Spinner />;
    if (error) return "Error";
    return (
        <>
            <Navbar userid={id}/>
        <div className="add-website-page">




        <div className="add-website-info">
            <div className="popup_title">

                <h2 className="add_website_tittle">Add website</h2>
            </div>
            <div>
                <form onSubmit={AddWebsite}>
                    <div className="form-group">
                        <div className='input_labelAddWebsite'>
                            <label className="add_website_questions">What is the URL of your Website?</label>
                            <input
                                type="text"
                                name="website_url"
                                id="website_url"
                                placeholder="URL"
                                value={addWebsiteUrl}
                                className='admin_input'
                                onChange={(e) => {
                                    setaddWebsiteUrl(e.target.value)
                                }}
                                required

                            />
                            <label className="example">e.g. www.google.com</label>
                        </div>
                        <div className='input_labelAddWebsite'>
                            <label className="add_website_questions">What is the Time to add (the time it takes to add a
                                link from the time it is requested)?</label>
                            <input
                                type="text"
                                name="time_to_add"
                                id="time_to_add"
                                placeholder="Time to add"
                                className='admin_input'
                                value={AddTimeToAdd}
                                onChange={(e) => {
                                    setAddTimeToAdd(e.target.value)
                                }}
                                required

                            />
                            <label className="example">e.g. 24 hours, or 3 days</label>
                        </div>
                        <div className='input_labelAddWebsite'>
                            <label className="add_website_questions">What is the Sample URL of your website(how the
                                final link will look)?</label>
                            <input
                                type="text"
                                name="sample_url"
                                id="example"
                                placeholder="Sample URL"
                                className='admin_input'
                                value={AddSampleUrl}
                                onChange={(e) => {
                                    setAddSampleUrl(e.target.value)
                                }}
                                required

                            />
                            <label className="example">e.g. site.com/blog/five-ways-to-eat-hummus/</label>
                        </div>
                        <div className='terms'>
                            <input
                                type="checkbox"
                                name="terms"
                                id="terms"
                                value="true"
                                className="custom-checkbox"
                                required

                            />
                            <div className="terms-paragraph">
                                <label style={{fontWeight: "100"}}>I agree on terms and conditions: <span
                                    id="dots">...</span><span id="more">I understand that when I give backlinks from this site I won’t be paid
                            but I will get points that I can use within the system to get backlinks for my site</span></label>
                            </div>
                            {/*<button onClick={myFunction} id="myBtn">Read more</button>*/}
                            <input
                                onClick={myFunction}
                                id="myBtn"
                                type="button"
                                value={message}
                            />

                        </div>
                        <div className="buttons-add-websites">

                            <div className="add_website_buttons">
                                <div className="confirm-button">

                                    <input
                                        type="submit"
                                        className="add_website_btn"
                                        value="Confirm"
                                    />
                                </div>
                                <div className="cancel-button">
                                    <input
                                        onClick={navigateToProfile}
                                        type="button"
                                        className="cancel_website_btn"
                                        value="Cancel"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>
        </div>
            <Footer/>
        </>


    );
}

export default AddWebsite;
