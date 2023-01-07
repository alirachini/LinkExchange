import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaIdBadge, FaRegIdBadge } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Register = ({ auth, setAuth }) => {
  document.title = "Register | LES";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
   const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);


 
  let canSubmit = false;
  // const { first_name, last_name, email, password, password_confirmation } =
  //   formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if(canSubmit){
    

    axios
      .post("/register", formData)
      .then((response) => {

        const { data: user } = response;
        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/send-verification");
        return user;
        // console.log(response);
        // localStorage.setItem('token', response.data.token);
        // setSuccess(response.data.message);
        // const { token } = response.data;
        // setAuth(token);
        // localStorage.setItem("token", JSON.stringify(token));
        // console.log(response);
        // return token;
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });
    }
  };

  // Login Function
  // const registerProcess = async (userData) => {
  //   try {
  //     const response = await axios.post("/register", userData);
  //     console.log(response);
  //     if (response.data) {
  //       const { data: user } = response;
  //       setAuth(user);
  //       localStorage.setItem("user", JSON.stringify(user));
  //       setSuccess(response.data.message);
  //       return user;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setErrorMessage(err.response.data.message);
  //     throw new Error();
  //   }
  // };

  // // On Submit Action
  // const formSubmit = async (e) => {
  //   e.preventDefault();
  //   setErrors(validate(formData));
  //   if (canSubmit) {
  //     try {
  //       await registerProcess({
  //         first_name,
  //         last_name,
  //         email,
  //         password,
  //         password_confirmation,
  //       });
  //       setFormData({
  //         first_name: "",
  //         last_name: "",
  //         email: "",
  //         password: "",
  //         password_confirmation: "",
  //       });
  //       // navigate('/home');
  //       // window.open('/home');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // Validation for Enroll Form
  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (values.first_name === "") {
      errorMessages.first_name = "First name is required";
    } else if (values.first_name.length < 2) {
      errorMessages.first_name = "First name should be at least 2 characters";
    } else {
      errorMessages.first_name = "";
    }
    if (values.last_name === "") {
      errorMessages.last_name = "Last name is required";
    } else if (values.last_name.length < 2) {
      errorMessages.last_name = "Last name should be at least 2 characters";
    } else {
      errorMessages.last_name = "";
    }

    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessages.email = "Invalid Email address!";
    } else {
      errorMessages.email = "";
    }
    if (values.password === "") {
      errorMessages.password = "Password is required";
    } else if (values.password.length < 8) {
      errorMessages.password = "Password should be at least 8 characters";
    } else {
      errorMessages.password = "";
    }
    if (values.password_confirmation !== values.password) {
      errorMessages.password_confirmation = "You Must Confirm your password";
    } else {
      errorMessages.password_confirmation = "";
    }

    if (
      errorMessages.first_name === "" &&
      errorMessages.last_name === "" &&
      errorMessages.email === "" &&
      errorMessages.password === "" &&
      errorMessages.password_confirmation === ""
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };



  // Reset Messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);

    } if (success) {
      setTimeout(() => {
        setSuccess("");
        // navigate("/send-verification");
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
          <h1>Sign Up</h1>
          {success && <p className="succeed-msg">{success}</p>}
          {errorMessage && <p className="error-msg">{errorMessage}</p>} 
        </section>
        <section className="form">
          <form onSubmit={formSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                First Name:
              </label>
              <div className="form-input-div">
                <div>
                  <FaIdBadge />{" "}
                </div>
                <input
                  type="text"
                    className={errors.first_name ? "error" : "form-valid"}
                  name="first_name"
                  id="first_name"
                  //   value={first_name}
                  placeholder="Enter your first name"
                  onChange={onChange}
                />
              </div>
              <p>{errors.first_name}</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Last Name:
              </label>
              <div className="form-input-div">
                <div>
                  <FaRegIdBadge />{" "}
                </div>
                <input
                  type="text"
                    className={errors.last_name ? "error" : "form-valid"}
                  name="last_name"
                  id="last_name"
                  //   value={last_name}
                  placeholder="Enter your last name"
                  onChange={onChange}
                />
              </div>
              <p>{errors.last_name}</p> 
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <div className="form-input-div">
                <div>
                  <MdOutlineAlternateEmail />{" "}
                </div>
                <input
                  type="text"
                    className={errors.email ? "error" : "form-valid"}
                  name="email"
                  id="email"
                  //   value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                />
              </div>
              <p>{errors.email}</p> 
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <div className="form-input-div">
                <div>
                  <RiLockPasswordFill />{" "}
                </div>
                <input
                  type="password"
                    className={errors.password ? "error" : "form-valid"}
                  name="password"
                  id="password"
                  //   value={password}
                  onChange={onChange}
                  placeholder="Enter your password"
                />
                
              </div>
              <p>{errors.password}</p> 

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Confirm Your Password:
                </label>
                <div className="form-input-div">
                  <div>
                    <RiLockPasswordFill />{" "}
                  </div>
                  <input
                    type="password"
                      className={errors.password_confirmation ? "error" : "form-valid"}
                    name="password_confirmation"
                    id="password_confirmation"
                    //   value={password_confirmation}
                    placeholder="Confirm Your Password"
                    onChange={onChange}
                  />
                </div>
              </div>
              <p>{errors.password_confirmation}</p> <br/>

              
              <Link to="/">
                <p className="secondp">Already have an account? Log in</p>
              </Link>
            </div>

            <div className="form-group">
              <input type="submit" className="btn" value="Sign Up" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
