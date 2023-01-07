import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { render } from 'react-dom';
import { MdTitle } from "react-icons/md";
import { AiOutlineLink, AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import { BsChevronCompactLeft, BsLink } from "react-icons/bs";
import { BiNote } from "react-icons/bi";
import { stepConnectorClasses, TextField, useStepContext } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../Requests/ViewRequest.css";
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer";

const ViewRequest = ({auth:{ user: {id} }}) => {
  const { state } = useLocation();
  const { request, comment, loggeduser, website} = state;  //request is the request clicked and it is done, comment are the comments and it is done logged user is used here as a dynamic so it should be gotten in the requests page as a dynamic data
  const [done,setdone]=useState(true)
  const [editing, setediting] = useState(false);
  const [title, settitle] = useState("");
  const [url, seturl] = useState("");
  const [addedcomment,setaddedcomment]=useState('');
  const [link_to_article, setlinktoarticle] = useState("");
  const [note, setnote] = useState("");
  const navigate = useNavigate();
  const editdata = (request) => {
    settitle(request.article_title);
    setlinktoarticle(request.link_to_article);
    seturl(request.URL);
    setnote(request.note);
  };

  const savetitle = (e) => {
    settitle(e.target.value);
  };
  const savelink = (e) => {
    setlinktoarticle(e.target.value);
  };
  const saveurl = (e) => {
    seturl(e.target.value);
  };
  const savenote = (e) => {
    setnote(e.target.value);
  };
  const saveedited = async (request, title, url, link_to_article, note) => {
    const response = await axios.post(`http://localhost:8000/api/requestupdate/${request.id}?title=${title}&url=${url}&link=${link_to_article}&note=${note}`);
    console.log(response.data)
  };

  const accept_request =async(requestId) =>{
    const response = await
    axios({
      method: 'post',
      url: `http://localhost:8000/api/acceptrequest/${requestId}`});
    setdone(false);
  }
  const add_comment= async(requestId,addedcomment,loggeduser)=>{
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const response = await axios.post(`http://localhost:8000/api/addcomment/${requestId}?commenter=${loggeduser}&comment=${addedcomment}&date=${date}`);
    console.log(date)
  }
  const reject_request = async(requestId)=>{
    const response = await
    axios({
      method: 'post',
      url: `http://localhost:8000/api/rejectrequest/${requestId}`});
    setdone(false);

  }
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <div>
      <Navbar userid={id}/>
      <div className="view-request">
        <div className="data">
          {editing ? (
            <div className="request-side">
              <h2>Request</h2>
              <div className="request">
                <div className="uneditable-data">
                  <label className="from-label">From :</label>
                  <label className="from-text">
                    {request.website_sender.website_url}
                  </label>
                  <label className="to-label">To :</label>
                  <label className="to-text">
                    {request.website_receiver.website_url}
                  </label>
                  <label className="time-to-add-label">Time To Add :</label>
                  <label className="time-to-add-text">
                    {request.website_receiver.time_to_add}
                  </label>
                  <label className="status-label">Status :</label>
                  <label className="status-text">
                    {request.status.request_status}
                  </label>
                  <label className="amount-label">Request Price :</label>
                  <label className="amount-text">{request.amount}</label>
                </div>
                <div className="editable-data">
                  <label className="title-label">Title:</label>
                  <ThemeProvider theme={theme}>
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="standard"
                    >
                      <Box display="flex">
                        <MdTitle className="pass" size="30" />
                        <TextField
                          id="input-with-icon-textfield"
                          placeholder={request.article_title}
                          variant="standard"
                          onChange={(e) => savetitle(e)}
                          sx={{ width: "35ch" }}
                        />
                      </Box>
                    </FormControl>
                  </ThemeProvider>
                  <label className="url-label">URL :</label>
                  <ThemeProvider theme={theme}>
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="standard"
                    >
                      <Box display="flex">
                        <AiOutlineLink className="pass" size="30" />
                        <TextField
                          id="input-with-icon-textfield"
                          placeholder={request.URL}
                          variant="standard"
                          onChange={(e) => saveurl(e)}
                          sx={{ width: "35ch" }}
                        />
                      </Box>
                    </FormControl>
                  </ThemeProvider>
                  <label className="link-to-article-label">
                    Link To Article :
                  </label>
                  <ThemeProvider theme={theme}>
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="standard"
                    >
                      <Box display="flex">
                        <BsLink className="pass" size="30" />
                        <TextField
                          id="input-with-icon-textfield"
                          placeholder={request.link_to_article}
                          variant="standard"
                          sx={{ width: "35ch" }}
                          onChange={(e) => savelink(e)}
                        />
                      </Box>
                    </FormControl>
                  </ThemeProvider>
                  <label className="note-label">Note :</label>
                  <ThemeProvider theme={theme}>
                    <FormControl
                      sx={{ m: 1, width: "30ch" }}
                      variant="standard"
                    >
                      <Box display="flex">
                        <BiNote className="pass" size="30" />
                        <TextField
                          id="input-with-icon-textfield"
                          placeholder={request.note}
                          variant="standard"
                          sx={{ width: "30ch" }}
                          onChange={(e) => savenote(e)}
                        />
                      </Box>
                    </FormControl>
                  </ThemeProvider>
                </div>
              </div>
            </div>
          ) : (
            <div className="request-side">
              <h2>Request</h2>
              <div className="request">
                <div className="uneditable-data">
                  <label className="from-label">From :</label>
                  <label className="from-text">
                    {request.website_sender.website_url}
                  </label>
                  <label className="to-label">To :</label>
                  <label className="to-text">
                    {request.website_receiver.website_url}
                  </label>
                  <label className="time-to-add-label">Time To Add :</label>
                  <label className="time-to-add-text">
                    {request.website_receiver.time_to_add}
                  </label>
                  <label className="status-label">Status :</label>
                  <label className="status-text">
                    {request.status.request_status}
                  </label>
                  <label className="amount-label">Request Price :</label>
                  <label className="amount-text">{request.amount}</label>
                </div>
                <div className="editable-data">
                  <label className="title-label">Title:</label>
                  <label className="title-text">{request.article_title}</label>
                  <label className="url-label">URL :</label>
                  <label className="url-text">{request.URL}</label>
                  <label className="link-to-article-label">
                    Link To Article :
                  </label>
                  <label className="link-to-article-text">
                    {request.link_to_article}
                  </label>
                  <label className="note-label">Note :</label>
                  <label className="note-text">{request.note}</label>
                </div>
              </div>
            </div>
          )}

          <div className="comments-side">
            <h2>Comments</h2>
            <div className="comments">
              {comment.map((item, index) => {
                return (
                  <>
                    {item.commenter_id === request.website_id_sender ? (
                      <div key={index} className="comment-text-sender">
                        <label>From:</label>
                        <label>{item.website.website_url}</label>
                        {item.comment}
                        <label>{item.date}</label>
                      </div>
                    ) : (
                      <div key={index} className="comment-text-receiver">
                        <label>From:</label>
                        <label>{item.website.website_url}</label>
                        {item.comment}
                        <label>{item.date}</label>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <>
            <div className="add-comment-div">
            { request.website_id_sender === loggeduser ? <>
            <textarea className="add-comment"
              onChange={(e)=>{setaddedcomment(e.target.value)}}></textarea>
              <div className="add-comment-button">
                <Button className="add-comment-b" variant="contained"
                onClick={()=>{if(addedcomment != ""){add_comment(request.id,addedcomment,website);
                navigate('/requests');}
                else
                console.log("no")}}>
                  Add comment
                </Button>
                </div></>:<>
                <textarea className="add-comment"
              onChange={(e)=>{setaddedcomment(e.target.value)}}></textarea>
              <div className="add-comment-button">
                <Button className="add-comment-b" variant="contained"
                onClick={()=>{if(addedcomment != ""){add_comment(request.id,addedcomment,website);
                navigate('/requests');}
                else
                console.log("no")}}>
                  Add comment
                </Button>
                </div></>}
                <div className="all-controllers">
                  {done && request.status.request_status === "Progress" ? <>
                  {request.status.request_status === "Progress" & request.website_id_sender === website ? ( //change it to !loggeduser to get it to the opposite user
                    <div className="controllers-sender">
                      {editing ? (
                        <Button disabled>Edit</Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => {
                            setediting(!editing);
                            editdata(request);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                      {editing ? (
                        <Button
                          variant="contained"
                          onClick={() => {
                            setediting(!editing);
                            saveedited(
                              request,
                              title,
                              url,
                              link_to_article,
                              note
                            );
                            navigate("/requests")
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button disabled>Save</Button>
                      )}
                    </div>
                  ) : (
                    <div className="controllers-receiver">
                      <Button variant="contained" color="success" 
                      onClick={()=>{accept_request(request.id)}}>
                        Accept
                      </Button>
                      <Button variant="outlined" color="warning"
                      onClick={()=>{reject_request(request.id)}}
                      >
                        Reject
                      </Button>
                    </div>
                  )}</>:<div className="controllers-done">
                    <Button variant="contained" onClick={()=> navigate('/requests')}> Done</Button>
                    </div>} 
                </div>
              </div>
            </>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewRequest;
