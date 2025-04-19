import React, { useState } from 'react';
import "../assets/page_reset.css";
import logo_isimm from "../assets/logo_isimm.jpeg";                                                                    
import isimm_photo from "../assets/isimm_photo.webp";
export default function Page_reset() {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
    if (password !== e.target.value) {
      setErrorMessage("les deux mots de passes sont differentes");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div className="page-container" style={{backgroundImage: `url(${isimm_photo})`}}>
      <div 
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          top: "47%",
          left: "51%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="logo-reset">
          <img src={logo_isimm} alt="ISIMM Logo" />
        </div>
        <form className="form">
          <p className="form-title">Réinitialiser le mot de passe</p>
          <div className="input-container" style={{ display: "none" }}>
            <input type="text" value="" readOnly></input>
          </div>
          <div className="input-container">
            <input type="text" value="CIN :     12895249" readOnly></input>
          </div>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Entrer mot de passe"
              value={password}
              onChange={handlePasswordChange}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              title="Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number"
              required
            ></input>       
          </div>
          <div className="input-container">
            <input 
              type="password" 
              placeholder="Confirmer mot de passe"
              value={retypePassword}
              onChange={handleRetypePasswordChange}
              required
            ></input>
          </div>
          {errorMessage && <p style={{ marginTop: "20px",marginLeft: "20px",color: "red", fontSize: "10px" }}>{errorMessage}</p>}
          <button type="submit" className="submit" style={{ marginTop: "25px" }} disabled={errorMessage !== ""}>
            Changer Mot de passe
          </button>
          <p style={{fontSize: "10px",marginTop:"10px",marginLeft:"20px",color:"red"}}> NB : Le mot de passe doit contenir au moins 8 caractères, incluant une lettre majuscule, une lettre minuscule et un chiffre.</p>
        </form>
      </div>    
    </div>
  );
}