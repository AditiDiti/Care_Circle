import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { MDBBtn } from "mdb-react-ui-kit";
import MinimalNavbar from "../components/MinimalNavbar";


function ApplyDoctor() {
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
    specialization: "",
    experience: "",
    fees: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;

      const { firstname, lastname, email, password, confpassword, specialization, experience, fees } = formDetails;
      if (!firstname || !lastname || !email || !password || !confpassword || !specialization || !experience || !fees) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      await toast.promise(
        axios.post("/doctor/applyfordoctor", {
          firstname,
          lastname,
          email,
          password,
          specialization,
          experience,
          fees,
        }).catch((error) => toast.error(error.message) ),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <>
      <MinimalNavbar />
      <section className="register-section flex-center">
        <div className="register-container flex-center">
          <h2 className="form-heading">Apply for Doctor</h2>
          <form onSubmit={formSubmit} className="register-form">
            <input
              type="text"
              name="firstname"
              className="form-input"
              placeholder="Enter your first name"
              value={formDetails.firstname}
              onChange={inputChange}
            />
            <input
              type="text"
              name="lastname"
              className="form-input"
              placeholder="Enter your last name"
              value={formDetails.lastname}
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
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formDetails.password}
              onChange={inputChange}
            />
            <input
              type="password"
              name="confpassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formDetails.confpassword}
              onChange={inputChange}
            />
            <input
              type="text"
              name="specialization"
              className="form-input"
              placeholder="Enter your specialization"
              value={formDetails.specialization}
              onChange={inputChange}
            />
            <input
              type="number"
              name="experience"
              className="form-input"
              placeholder="Enter your experience in years"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="number"
              name="fees"
              className="form-input"
              placeholder="Enter your fees"
              value={formDetails.fees}
              onChange={inputChange}
            />
            <MDBBtn
              type="submit"
              className="btn form-btn"
              disabled={loading}
            >
              Apply
            </MDBBtn>
          </form>
        </div>
      </section>
    </>
  );
}

export default ApplyDoctor;
