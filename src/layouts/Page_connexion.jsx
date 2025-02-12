import React, { useState } from "react";
import "../assets/page_connexion_form.css";
import { useNavigate } from "react-router-dom";
import isimm_photo from "../assets/isimm_photo.jpeg";
import "../assets/sign.css";


export default function PageConnexion() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  localStorage.setItem("isAuthenticated", "false");

  const handledLogin = (event) => {
    event.preventDefault();
    if (email === "aziz@gmail.com" && password === "aziz") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/main/dashboard");
    } else {
      console.log("login failed");
      console.log(email);
      console.log(password);
    }
  };


  return (
    <div
      style={{
        backgroundImage: `url(${isimm_photo})`,
        backgroundSize: "cover",
        backgroundColor: "#F3F3F3",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        position: "absolute",
      }}
    >
      <div
        className="wrapper"
        style={{
          position: "absolute",
          backgroundColor: "#F3F3F3",
          top: "40%",
          left: "52%",
          transform: "translate(-50%, -50%)",
          width: "550px",
          padding: "30px",
          borderRadius: "10px",
          backdropFilter: "blur(1px) brightness(90%)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/fr/0/06/ISIM_LOGO_ar.png" alt="" />
        </div>
        <br></br>
        <div className="text-right mt-4 name" style={{ marginLeft: "34%" }}>
          ISIMM TEAM
        </div>
        <br></br>
        <form>
          <div className="inputs">
            <input
              placeholder="Email"
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              placeholder="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="checkbox-container">
            <label className="checkbox">
              <input type="checkbox" id="checkbox"></input>
            </label>
            <label htmlFor="checkbox" className="checkbox-text">
              Remember me
            </label>
          </div>
          <div className="btn-container">
            <button id="lol" onClick={handledLogin}>
              Sign In
            </button>
            <br />
            <br />
            <a className="forget" href="#">
              Forget password ?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
