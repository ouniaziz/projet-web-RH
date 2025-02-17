import React, { useState } from "react";
import "../assets/page_connexion_form.css";
import { useNavigate } from "react-router-dom";
import isimm_photo from "../assets/isimm_photo.jpeg";
import logo_isimm from "../assets/logo_isimm.jpeg";
import "../assets/sign.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export default function PageConnexion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  localStorage.setItem("isAuthenticated", "false");
  const handledLogin = (event) => {
    event.preventDefault();
    if (email === "aziz@gmail.com" && password === "aziz") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/main/dashboard");
    } else {
      alert("password incorrect");
    }
  };
  
  return (
    <>
            <div
              style={{
                backgroundImage: `url(${isimm_photo})`,
                backgroundSize: "cover",
                backgroundColor: "#F3F3F3",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "brightness(70%)",
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
                  backdropFilter: "blur(4px) brightness(70%)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
              >
                <div className="logo">
                  <img src={logo_isimm} alt="ISIMM Logo" />
                </div>
                <br></br>
                <div style={{ marginLeft: "36%",fontSize: "25px",fontFamily: "monospace",fontWeight:"bold", color: "rgb(12, 68, 173)" }}>
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
                              style={{ color: "black"}}
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
                    <a className="forget" onClick={handleOpen} href="#">
                      Forget password ?
                    </a>
                  </div>
                </form>
              </div>
            </div>






            <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position: "absolute",
                        backgroundColor: "rgba(42, 67, 254, 0.43)",
                      }}
                    >
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                        Retrieve Password via Email
                        </Typography>
                        <br></br>
                        <form action="">
                            <input
                                  placeholder="Email"
                                  className="input"
                                  value={email}
                                  style={{ color: "black"}}
                                  onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <Button type="submit" style={{marginTop:"10px", marginLeft:"79%",fontSize:"16px", }}>Envoyer</Button>

                        </form>    
                      </Box>
                    </Modal>
           </div>

  </>         
    
  );
}



const style = {
  position: 'absolute',
  top: '50%',
  left: '52%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px #000',
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};