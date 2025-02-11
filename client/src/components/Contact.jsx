import React, { useState } from "react";
import "../styles/contact.css";
import { MDBBtn } from "mdb-react-ui-kit";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <section
      className="container register-section flex-center home-section"
      id="contact"
    >
      <div className="contact-container flex-center contact">
        <h2 className="form-heading">Contact Us</h2>
        <form
          method="POST"
          action={`https://formspree.io/f/${process.env.REACT_FORMIK_SECRET}`}
          className="register-form "
        >
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <textarea
            type="text"
            name="message"
            className="form-input"
            placeholder="Enter your message"
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
          ></textarea>

          <MDBBtn
            type="submit"
            className="btn form-btn"
          >
            Send
          </MDBBtn>
        </form>
      </div>
    </section>
  );
};

export default Contact;
