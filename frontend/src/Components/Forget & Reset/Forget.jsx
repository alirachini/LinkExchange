import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png";

const Forget = ({ auth }) => {
  document.title = "Forgot Password | LES";
  const navigate = useNavigate();
  let canSubmit = false;
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState("");
  const { email } = formData;

  const onChangeEmail = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Forget Password Function
  const forgetPassword = async (userData) => {
    try {
      const response = await axios.post("/forget-password", userData);
      if (response.data) {
        const { data: message } = response;
        setSuccess(response.data.message);
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      throw new Error();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      const message = await forgetPassword(formData);
    //   setSuccess(message.message);
      setFormData({ email: "" });
    }
  };

  const validate = (values) => {
    canSubmit = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errorMessages = {};
    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessages.email = "Invalid Email address!";
    } else {
      errorMessages.email = "";
    }
    if (errorMessages.email === "") {
      canSubmit = true;
    }
    return errorMessages;
  };

  useEffect(() => {
    // if (auth) {
    //   navigate("/");
    // }
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
    if(localStorage.getItem('user')){
      navigate("/home");
    }
  }, [errorMessage, auth, success]);
  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
            <img src={Logo} alt="logo"/> <br/>
          <h1>Forgot Password</h1>
          {success && <p className="succeed-msg">{success}</p>}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </section>
        <section className="form">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <div className="form-input-div">
                <div>
                  <HiOutlineMail />
                </div>
                <input
                  type="text"
                  className={errors.email ? "error" : "form-valid"}
                  name="email"
                  id="email"
                  // value={email}
                  placeholder="Enter your email"
                  onChange={onChangeEmail}
                />
              </div>
              <p>{errors.email}</p>
              <Link to="/">
                <p className="secondp">Back to Login?</p>
              </Link>
            </div>
            
            <div className="form-group reset">
              <input type="submit" className="btn" value="Send Email" />
              
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Forget;
