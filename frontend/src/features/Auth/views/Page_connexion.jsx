import React, { useState } from "react";
import "../assets/page_connexion_form.css";
import { useNavigate } from "react-router-dom";
import isimm_photo from "../assets/isimm_photo.jpeg";
import logo_isimm from "../assets/logo_isimm.jpeg";
import "../assets/sign.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useStore} from "../../../service/store";
import {useNotificationStore} from "../../../service/notificationService";
import {myApi} from "../../../service/myApi";

export default function PageConnexion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const showFloatingNotification = useNotificationStore((state)=>state.showFloatingNotification)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    localStorage.setItem("isAuthenticated", "false");

    //TODO: Set store states
    /*
        set({
            role: response.data.role,
            username: response.data.nom,
            cin: response.data.cin,
            isAuthenticated: true,
            isLoading: false,
        });
    */
    const handledLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try{
            /* To apply authentication:
                Uncomment this:
            */
            /*await myApi.login(email, password).then((response)=>{
                showFloatingNotification({
                    type:"success",
                    title:"Auth",
                    content:"Bienvenu, "+response.data.nom
                })
                localStorage.setItem("isAuthenticated", "true");
                navigate("/main/dashboard");

            })*/
            /* Comment this:*/
            localStorage.setItem("isAuthenticated", "true");
            navigate("/main/dashboard");

        }catch(err){
            showFloatingNotification({
                type:"error",
                content:err.response.data.error,
                title:"Auth"
            })
        }finally {
            setIsLoading(false)
        }
    };

    const forgotPassword = async ()=>{
        setIsLoading(true)
        await myApi.forgotPassword(email).then((res)=>{
            showFloatingNotification({
                type:"success",
                title:"Password reset",
                content: res.data.message
            })
        }).catch((err)=>{
            showFloatingNotification({
                type:"error",
                content:err.response.data.error,
                title:"Auth"
            })
        }).finally(()=>setIsLoading(false))
    }
    return (
    <>
      <div
        style={{
          backgroundImage: `url(${isimm_photo})`,
          backgroundSize: "cover",
          backgroundColor: "rgba(31, 68, 117, 0.976)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundBlendMode: "soft-light",
          height: "100%",
          width: "100%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          className="wrapper"
          style={{
            padding: "30px",
            borderRadius: "10px",
            backdropFilter: "blur(4px) brightness(70%)",

          }}
        >
          <div className="logo">
            <img src={logo_isimm} alt="ISIMM Logo" />
          </div>
          <br></br>
          <div style={{ fontSize: "30px",fontFamily: "initial",fontWeight:"bold", color: "#115eee" }}>
            ISIMM
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
              <button id="lol" onClick={handledLogin} disabled={isLoading}>
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
                  backgroundColor: "rgba(42, 67, 254, 0.43)",
                }}
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
                  Retrieve Password via Email
                  </Typography>
                  <br></br>
                  <form>
                      <input
                            placeholder="Email"
                            className="input"
                            value={email}
                            style={{ color: "black"}}
                            onChange={(e) => setEmail(e.target.value)}
                      ></input>
                      <Button disabled={isLoading} style={{marginTop:"10px", marginLeft:"79%",fontSize:"16px", }} onClick={forgotPassword}>Envoyer</Button>
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
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'white',
  border: '2px #000',
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
