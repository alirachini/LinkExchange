import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import "./RequestCard.css";
import swal from "sweetalert";

const RequestCard = ({ token }) => {
  const { id, dr } = useParams();
  const navigate = useNavigate();
  document.title = "Request Backlink | LES";
  const [loading, setLoading] = useState(true);
  const [loggedInWebsites, setLoggedInWebsites] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  let canSubmit = false;
  const [formData, setFormData] = useState({
    article_title: "",
    URL: "",
    link_to_article: "",
    note: "",
    website_id_sender: "",
  });

  // const [userData, setUserData] = useState([]);

  

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  

  useEffect(() => {
    axios
      .get("/user-website", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.loggedInWebsites);
        setLoading(false);
        if (res.status === 200) {
          setLoggedInWebsites(res.data.loggedInWebsites);
          formData.website_id_sender = res.data.loggedInWebsites[0].id;
        }
      });



    //   axios
    // .get("/user", {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    // .then((res) => {
    //   setUserData(res.data);
    //   console.log(res.data);
    // })

    // .catch((error) => {
    //   console.error(error.message);
    // });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData));

    const data = {
      article_title: formData.article_title,
      URL: formData.URL,
      link_to_article: formData.link_to_article,
      note: formData.note,
      website_id_sender: formData.website_id_sender,
      status_id: 3,
      amount: dr,
      website_id_receiver: id,
    };
    if (canSubmit) {
      axios
        .post("/backlink", data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          swal({
            title: "Request send!",
            text: "Wait for the response!",
            icon: "success",
            button: "Done!",
          });
          navigate("/home");
        });
    }
  };


  

  // if (loading) return <Spinner />;

  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};

    if (values.article_title === "") {
      errorMessages.article_title = "Article Title is required";
    } else if (values.article_title.length < 2) {
      errorMessages.article_title =
        "Article Title should be at least 2 characters";
    } else {
      errorMessages.article_title = "";
    }
    if (values.URL === "") {
      errorMessages.URL = "URL is required";
    } else if (values.URL.length < 2) {
      errorMessages.URL = "URL should be at least 2 characters";
    } else {
      errorMessages.URL = "";
    }

    if (values.link_to_article === "") {
      errorMessages.link_to_article = "Link is required";
    } else if (values.link_to_article.length < 2) {
      errorMessages.link_to_article = "Link should be at least 2 characters";
    } else {
      errorMessages.link_to_article = "";
    }

    if (
      errorMessages.article_title === "" &&
      errorMessages.URL === "" &&
      errorMessages.link_to_article === ""
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="form-backlink">
        <div className="div-backlink">
          <section className="section-backlink">
            <br />
            <h1>Request Backlink</h1>
          </section>

          <form onSubmit={onSubmit}>
            <div className="the-select">
              <label htmlFor="websites">My website:</label>
              <select name="website_id_sender" onChange={onChange}>
                {loggedInWebsites?.map((item) => (
                  <option value={item.id}>{item.website_url}</option>
                ))}
              </select>
            </div>
            <section className="section-backlink">
              <br />
              <h1>Request Details</h1>
            </section>

            <div className="the-select">
              <label htmlFor="password">Article Title:</label>
              <div>
                <input
                  type="text"
                  className={errors.article_title ? "error" : "form-valid"}
                  name="article_title"
                  id="article_title"
                  onChange={onChange}
                  placeholder="Enter your Article Title"
                />
              </div>
              <p>{errors.article_title}</p>
            </div>

            <div className="the-select">
              <label htmlFor="password">URL:</label>
              <div>
                <input
                  type="text"
                  className={errors.URL ? "error" : "form-valid"}
                  name="URL"
                  id="URL"
                  onChange={onChange}
                  placeholder="Enter your URL"
                />
              </div>
              <p>{errors.URL}</p>
            </div>
            <div className="the-select">
              <label htmlFor="password">Link to Article:</label>
              <div>
                <input
                  type="text"
                  className={errors.link_to_article ? "error" : "form-valid"}
                  name="link_to_article"
                  id="link_to_article"
                  onChange={onChange}
                  placeholder="Enter your Link to Article"
                />
              </div>
              <p>{errors.link_to_article}</p>
              <div className="the-select">
                <label htmlFor="password">Note:</label>
                <div>
                  <input
                    type="text"
                    className={errors.password ? "error" : "form-valid"}
                    name="note"
                    id="note"
                    onChange={onChange}
                    placeholder="Enter your Note"
                  />
                </div>
              </div>
            </div>

            <div className="the-buttons">
              <input type="submit" className="btn" value="Request" />
              <Link to="/home">
                {" "}
                <input className="btn" value="Back" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default RequestCard;
