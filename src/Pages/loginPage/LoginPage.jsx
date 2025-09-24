import React, { useState } from "react";
import stars from "../../assets/spark.svg";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
let apiUrl = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const selectRole = (role) => {
    setSelectedRole(role);
  };

const continueToPoll = async () => {
  if (!selectedRole) {
    alert("Please select a role.");
    return;
  }

  if (selectedRole === "teacher") {
    try {
      const username = prompt("Enter your username"); // simple input for demo
      const password = prompt("Enter your password");
      const teacherlogin = await axios.post(`${apiUrl}/teacher-login`, {
        username,
        password,
      });
      if (teacherlogin.data.username) {
        sessionStorage.setItem("username", teacherlogin.data.username);
        navigate("/teacher-home-page");
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  } else if (selectedRole === "student") {
    navigate("/student-home-page");
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="poll-container text-center">
        <button className="btn btn-sm intervue-btn mb-5">
          <img src={stars} className="px-1" alt="" />
          Intervue Poll
        </button>
        <h3 className="poll-title">
          Welcome to the <b>Live Polling System</b>
        </h3>
        <p className="poll-description">
          Please select the role that best describes you to begin using the live
          polling system
        </p>

        <div className="d-flex justify-content-around mb-4">
          <div
            className={`role-btn ${selectedRole === "student" ? "active" : ""}`}
            onClick={() => selectRole("student")}
          >
            <p>I'm a Student</p>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </span>
          </div>
          <div
            className={`role-btn ${selectedRole === "teacher" ? "active" : ""}`}
            onClick={() => selectRole("teacher")}
          >
            <p>I'm a Teacher</p>
            <span>Submit answers and view live poll results in real-time.</span>
          </div>
        </div>

        <button className="btn continue-btn" onClick={continueToPoll}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
