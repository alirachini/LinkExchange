import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoBarcode } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "./SendVerify.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png"

const SendVerify = ({  }) => {
  document.title = "Send Verification | LES";
  // const navigate = useNavigate();
  let canSubmit = false;
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChangePass = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset Password Function
  const resetPassword = async (userData) => {
    try {
      const response = await axios.post("/send-verification", userData);
      if (response.data) {
        const { data: message } = response;
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
      const message = await resetPassword(formData);
      setSuccess(message.message);
      setFormData({
        email: "",
      });
    }
  };

  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessages.email = "Invalid Email address!";
    } else {
      errorMessages.email = "";
    }
    
    if (
      errorMessages.email === "" 
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        // navigate("/");
      }, 5000);
    }
    // if () {
    //   navigate("/");
    // }
  }, [errorMessage ]);

  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
        <img src={Logo} alt="logo"/> <br/>
          <h1>Send Verification</h1>
          {success && <p className="succeed-msg">{success}</p>}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </section>
        <section className="form">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <div className="form-input-div">
                <div>
                  <HiOutlineMail />
                </div>
                <input
                  type="email"
                  className={errors.email ? "error" : "form-valid"}
                  name="email"
                  id="email"
                //   value={email}
                  onChange={onChangePass}
                  placeholder="Enter your Email Address"
                />
              </div>
              <p>{errors.email}</p>
              <Link to="/">
                <p className="secondp">Back to Login?</p>
              </Link>
            </div>
            
            <div className="form-group reset">
              <input type="submit" className="btn" value="Send" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SendVerify;
