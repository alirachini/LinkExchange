import React, { useState } from "react";
import "./Home.css";
import {useNavigate, Link} from 'react-router-dom';
import Footer from "../Footer/Footer";

function WebsitesCards({WebsitesData, score}) {
    const [searchrterm, setSearchTerm] = useState("");
    const [selects, setSelects] = useState("");
    const disableStyles = theme => ({
        disabledButton: {
            backgroundColor: theme.palette.primary || 'gray'
        }
    });
    const navigate = useNavigate();
    console.log(WebsitesData);
    console.log(score);
    const navigateToProfile = () => {
        // 👇️ navigate to / profile
        navigate('/profile');
    };


    return (
        <div className="adminfilter">
            <div className="filtering">
        <form action="" className="search-bar">
            <input type="search" name="search" pattern=".*\S.*"
                   onChange={(e) => {
                       setSearchTerm((e.target.value))
                   }}
                   required />
            <button className="search-btn" type="submit">
                <span>Search</span>
            </button>
             </form>
            <select className='website_select' value={selects}
                    onChange={(e) => setSelects(e.target.value)}>
                <option>ALL</option>
                <option>Available</option>
            </select>
             </div>
        <div className="container-cardss">


    {WebsitesData.websites.filter((item => {

        if (searchrterm === "") {
        return item;
    } else if (item.website_url.toLowerCase().includes(searchrterm.toLowerCase()) || item.website_url.toLowerCase().includes(searchrterm.toLowerCase())) {
        return item;
    }
    })).filter(item => {
        if (selects === "") {
            return item;
        } else if (selects === "ALL") {
            return item;
        } else if (selects === "Available") {
            return item.domain_rating <= (score);
        }}).map((item) => {

        return (
            <div  key={item.id} className="container-cardss">



             <div className="cardss">
                <div className="cardss-i">
                    <h3>URL : {item.website_url}</h3>

                    <div className="numberr">
                        <p style={{textAlign: "start"}}>Time to Add : {item.time_to_add}</p>
                        <p style={{textAlign: "end", marginLeft: "150px"}}>Domain Rating : {item.domain_rating}</p>
                        {/* <button className='confirmation' disabled={((score)  < item.domain_rating)} >Request BackLink
                        </button> */}
                        <Link to={`/request/${item.id}/${item.domain_rating}`}><button disabled={((score)  < item.domain_rating)} className="confirmation" onClick={() => {}}>
                        Request BackLink
                      </button></Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default WebsitesCards;
