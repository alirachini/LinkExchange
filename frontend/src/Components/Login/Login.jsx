import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "../../Assets/logo.png";
import "./Login.css";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Login = ({auth, setAuth}) => {
  document.title = "Login | LES";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();
  let canSubmit = false;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // // Login Function
  // const loginProcess = async (userData) => {
  //   try {
  //     const response = await axios.post("/login", userData);
  //     console.log(response);
  //     if (response.data) {
  //       console.log(response);
  //       const { data: user } = response;
  //       setAuth(user);
  //       localStorage.setItem("user", JSON.stringify(user));
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
  //       await loginProcess({ email, password });
  //       setFormData({ email: "", password: "" });
  //       navigate("/home");
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
    if (errorMessages.email === "" && errorMessages.password === "") {
      canSubmit = true;
    }
    return errorMessages;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if(canSubmit){
    

    axios
      .post("/login", formData)
      .then((response) => {

        const { data: user } = response;
        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
        return user;

        
        
        // const { token } = response.data;
        // setAuth(token);
        // localStorage.setItem("token", JSON.stringify(token));
        // console.log(response);
        // return token;
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data.message);
      });}
  };

  

  
  // Reset Messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
    if(localStorage.getItem('user')){
      navigate("/home");
    }
  }, [errorMessage]);

  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
          <img src={Logo} alt="Logo" />
          <br />
          <h1>Link Exchange</h1>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </section>
        <section className="form">
          <form onSubmit={formSubmit}>
          {/* <form> */}
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
              <Link to="/register">
                <p className="secondp">Dont have an account? Sign up</p>
              </Link>
              <Link to="/forget">
                <p className="secondp">Forget password?</p>
              </Link>
            </div>

            <div className="form-group">
              <input type="submit" className="btn" value="Login" />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
