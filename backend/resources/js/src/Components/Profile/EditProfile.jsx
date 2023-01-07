import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './EditProfile.css';
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import swal from "sweetalert";


const App = ({auth:{ user: {id, first_name, last_name, email} }}) => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const [websites, setWebsites] = useState(false);
    const [UserData, setUserData] = useState(null);

  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lasNameEdit, setLastNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [UserPassword, setUserPassword]  = useState("")


    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axios
                .get(`http://127.0.0.1:8000/api/getUser/${id}`, {
                    headers: {"Content-Type": "multipart/form-data"},
                });
            if (response) {
                setUserData(response.data[0][0]);
                setUserPassword(response.data[0][0].password);
                setFirstNameEdit(response.data[0][0].first_name);
                setLastNameEdit(response.data[0][0].last_name);
                setEmailEdit(response.data[0][0].email);
                setLoading(false);

            }
        } catch (e) {
            setError(e);
            console.error(e.message);
        }
    };

    console.log(UserPassword);
    useEffect(()=> {
        getUser();
    }, [])




  const EditProfile = async () => {
    setLoading(true);
    await axios.put(`http://127.0.0.1:8000/api/profile/${id}?first_name=${firstNameEdit}&last_name=${lasNameEdit}&email=${emailEdit}&password=${UserPassword}`)
        .then((res) => {
            swal({
                title: "Profile Updated!",
                icon: "success",
                button: "Done!",
            });
          setLoading(false);
            setWebsites(!websites);

        })

        .catch((error) => {
          setError(error);
          console.error(error.message)
        });

  };
    if (loading) return "...loading";

  return (
      <>
          < Navbar userid={id}/>
      <div className="home_wrapper">

        <Container className="EditProfileContainer">
          <Row>
            <Col>
              <Form onSubmit={() => {
                EditProfile()
              }}>
                <h1 className="titleEditProfzile">Update Profile</h1>
                <Form.Group >
                  <Form.Label className="LabelEditProfile">First Name:</Form.Label>
                  <Form.Control
                      name="firstname" className="text-boxEditProfile"
                      type="text"
                      value={firstNameEdit}
                      placeholder="Name.."
                      onChange={(e) => {
                        setFirstNameEdit(e.target.value)
                      }}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="LabelEditProfile">Last Name:</Form.Label>
                  <Form.Control className="text-boxEditProfile"
                                name="secondname"
                                value={lasNameEdit}
                                type="text"
                                placeholder="Surname.."
                                onChange={(e) => {
                                  setLastNameEdit(e.target.value)
                                }}

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="LabelEditProfile">Email address:</Form.Label>
                  <Form.Control className="text-boxEditProfile"
                                value={emailEdit}
                                name="email"
                                type="email"
                                placeholder="E-Mail"
                                onChange={(e) => {
                                  setEmailEdit(e.target.value)
                                }}

                  />

                </Form.Group>
                  <Form.Group>
                      <Form.Label className="LabelEditProfile">Password:</Form.Label>
                      <Form.Control className="text-boxEditProfile"
                                    value={UserPassword}
                                    name="pass"
                                    type="password"
                                    placeholder="password"
                                    onChange={(e) => {
                                        setUserPassword(e.target.value)
                                    }}

                      />

                  </Form.Group>


                <Button className="btn-lg" variant="success" type="submit">
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

</div>
          <Footer />
      </>
  );
};

export default App;
