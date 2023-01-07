import "../Requests/Requests.css";
import * as React from "react";
import axios from "axios";
import {GoPrimitiveDot} from "react-icons/go"
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import { Table, TableHead,TableContainer,TableRow, TableBody, Button, Box,Tabs,Tab,MenuItem,InputLabel,FormControl,Select,Paper,InputBase } from '@mui/material'
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer";



const Requests = ({auth: {
  user: { id },
}}) => {   //here the user is comming from the website along with the website id
  useEffect(() => {
    setuser(id)
    setstatus();
    console.log(id);
    get_all_statuses(id); //when the id of the website is available put it here
  }, []);
    const [user,setuser]=useState('')

    const [requestssent,setrequestssent]=useState([]);
    const [requestsreceived,setrequestsreceived]=useState([]);

    //get all requests from the backend
    const get_all_statuses = async (id) =>{
      const response1 = await axios.get(`http://localhost:8000/api/requestsentuser/${id}`);
      if(response1.data){
       setrequestssent(response1.data);
      }
      const response2 = await axios.get(`http://localhost:8000/api/requestreceiveduser/${id}`)
      if(response2.data){
        console.log(response2.data)
      setrequestsreceived(response2.data)
      }
    }


  const [statuses, setstatuses] = useState("");
  const [loading, setloading] = useState(true);
  const [Set,setSet]=useState(true)
  
  //get the statuses from backend
  const setstatus = async () => {
    const response = await axios.get("http://localhost:8000/api/statuses");
    if (response.data) {
      setstatuses(response.data);
    }
    setloading(false);
  };

  const [value, setValue] = React.useState(0);
  //onchange of the search textfield 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //style for the table 
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [datachanged,setdatachanged]=useState("")
  const changedata = (e) =>{
    console.log(e.target.value)
    setdatachanged(e.target.value)
  }
  //get comments of the request
  const [comments,setcomments] = useState([])
  const get_comments = async (id ,item, user, web) =>{
    console.log(id)
    const response = await axios.get(`http://localhost:8000/api/comments/${id}`)
    if(response.data){
    setcomments(response.data);
    navigate('/viewrequest', {state:{request:item, comment:response.data, loggeduser:user, website:web}}) //change the logged user to user
    console.log(item)
    }
    setloading(false)
  }

  const [changedstatus,setchangedstatus]=useState("")
  const changestatus = (item) => {
    setchangedstatus(item.request_status)
  }
  //navigate to another page
  const navigate = useNavigate();

  
  if (loading) return "loading...";
  return (
      <>
    <div>
      <Navbar userid={id} />
      <div className="all-requests-div">
        <div className="tabbing">
          <Paper className="search"
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 200,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by website"
              inputProps={{ "aria-label": "Search by website" }}
              onChange={(e)=>changedata(e)}
            />
              <SearchIcon />
          </Paper>
          <Box sx={{ width: "50%", bgcolor: "background.paper" }} className='tabs'>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab
                label="Requests Sent"
                onClick={() => {
                  setSet(true);
                  get_all_statuses(user); //when website id is available put it here
                }}
              />
              <Tab label="Requests Received" 
              onClick={() => {
                setSet(false);
                get_all_statuses(user); //when website id is available put it here
              }}/>
            </Tabs>
          </Box>
          <FormControl className="dropdownlist-select">
            <InputLabel id="demo-simple-select-label">Filter By Status</InputLabel>
            <Select
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 200,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Filter BY Status"
            >
              <MenuItem value="ALL" onClick={()=>{
                setchangedstatus("");
              }}>All</MenuItem>
              {statuses.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id} onClick={()=>{changestatus(item)}}>
                    {item.request_status}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div> {Set ?
        <div className="requests-sent">
        <TableContainer className="TableContainer" component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table_head" align="center">
                    Request Sent From
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                    Request Sent To
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                   Status
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                   Time To add
                  </StyledTableCell>
                  <StyledTableCell className="table_head" align="center">
                   View Request
                  </StyledTableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {requestssent.filter((item => {

if (datachanged === "") {
return item;
} else if (item.website_receiver.website_url.toLowerCase().includes(datachanged.toLowerCase()) || item.website_receiver.website_url.toLowerCase().includes(datachanged.toLowerCase())) {
return item;
}
})).filter((item => {
  if (changedstatus === "All") {
  return item;
  } else if (item.status.request_status.includes(changedstatus) || item.status.request_status.includes(changedstatus)) {
  return item;
  }
  })).map((item, index) => (
                  <StyledTableRow key={index} className="tablerow">
                    <StyledTableCell align="center" className="sentfrom">
                        {item.website_sender.website_url}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="sentto">
                        {item.website_receiver.website_url}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="status">
                        {item.status.request_status}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="time">
                        {item.website_receiver.time_to_add}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="view">
                        <Button onClick={()=>{
                          get_comments(item.id, item, user, item.website_id_sender);
                         }}>View</Button>
                    </StyledTableCell>
                    </StyledTableRow>))}
              </TableBody>
              </Table>
              </TableContainer>

              </div>:
              <div className="requests-received">
              <TableContainer className="TableContainer" component={Paper}>
                  <Table sx={{ minWidth: 100 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell className="table_head" align="center">
                          Request received From
                        </StyledTableCell>
                        <StyledTableCell className="table_head" align="center">
                          Request received To
                        </StyledTableCell>
                        <StyledTableCell className="table_head" align="center">
                         Status
                        </StyledTableCell>
                        <StyledTableCell className="table_head" align="center">
                         Time To add
                        </StyledTableCell>
                        <StyledTableCell className="table_head" align="center">
                         View Request
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {requestsreceived.filter((item => {

if (datachanged === "") {
return item;
} else if (item.website_sender.website_url.toLowerCase().includes(datachanged.toLowerCase()) || item.website_sender.website_url.toLowerCase().includes(datachanged.toLowerCase())) {
return item;
}
})).filter((item => {
  if (changedstatus === "") {
  return item;
  } else if (item.status.request_status.includes(changedstatus) || item.status.request_status.includes(changedstatus)) {
  return item;
  }
  })).map((item, index) => (
                  <StyledTableRow key={index} className="tablerow">
                    <StyledTableCell align="center" className="receivedfrom">
                        {item.website_sender.website_url}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="recievedto">
                        {item.website_receiver.website_url}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="status">
                        {item.status.request_status}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="time">
                        {item.website_receiver.time_to_add}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="view">
                        <Button
                        onClick={()=>{
                          get_comments(item.id, item, user, item.website_id_receiver);
                         }}>View</Button>
                    </StyledTableCell>
                    </StyledTableRow>))}  
                    </TableBody>
                    </Table>
                    </TableContainer>
                    </div>}

      </div>

    </div>

      </>
  );
};

export default Requests;