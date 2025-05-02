import React, {useState, useLayoutEffect} from 'react';
import styles from "../assets/page_activation.module.css";
import logo_isimm from "../assets/logo_isimm.jpeg";                                                                    
import isimm_photo from "../assets/isimm_photo.webp";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";;
import {
  IsimmButton,
  SuccessInputLabel,
  SuccessOutlinedInput,
  SuccessTextField
} from "../../../components/CustomComponents";
import {myApi} from "../../../service/myApi";
import {useNavigate} from "react-router-dom";
import {useNotificationStore} from "../../../service/notificationService";

//TODO: link this with Backend
export default function Page_activation() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [retypePassword, setRetypePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [activationToken,setActivationToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const showFloatingNotification = useNotificationStore((state)=>state.showFloatingNotification)
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    if(!pwd) return "";
    if (pwd.length < 8) return 'Must be at least 8 characters';
    if (!/[A-Z]/.test(pwd)) return 'Must contain an uppercase letter';
    if (!/[a-z]/.test(pwd)) return 'Must contain a lowercase letter';
    if (!/[0-9]/.test(pwd)) return 'Must contain a number';
    return '';
  };

  const isPasswordValid = () => {
    return password && !validatePassword(password);
  };

  const isConfirmationValid = () => {
    return retypePassword && password === retypePassword;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrMsg(validatePassword(newPassword))
    if(retypePassword && newPassword!== retypePassword){
      setErrorMessage("Ce n'est pas conforme à votre mot de passe saisie");
    }
    else{
      setErrorMessage("");
    }
  };

  const handleRetypePasswordChange = (e) => {
    const confirmPass = e.target.value;
    setRetypePassword(confirmPass);
    if (password !== confirmPass) {
      setErrorMessage("Ce n'est pas conforme à votre mot de passe saisie");
    } else {
      setErrorMessage("");
    }
  };

  const handleClickShowPassword =()=>setShowPassword((show) => !show);

  const activateAccount=()=>{
    setIsLoading(true)
    myApi.activateAccount({
      token: activationToken,
      password: password
    }).then(res=>{
        console.log(res.message)
        showFloatingNotification({
          type:"success",
          content:res.message,
          title:"Account activation"
        })
        navigate("/");
    }).catch(e=>{
      console.error(e)
      showFloatingNotification({
        type:"error",
        content:"An error occured",
        title:"Account activation"
      })
    }).finally(()=>setIsLoading(false));
  }


  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search)
    if(params.get("token")){
      setActivationToken(params.get("token"))
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    else {
      console.log("No token found")
    }
  }, []);
  return (
    <div className={styles.pageContainer} style={{backgroundImage: `url(${isimm_photo})`}}>
      <div className={styles.form}>
        <div className={styles.logoReset}>
          <img src={logo_isimm} alt="ISIMM Logo" />
        </div>
        <form onSubmit={(e)=>e.preventDefault()}>
          <p className={styles.formTitle}>Activer votre compte</p>
          <div className={styles.inputContainer}>
            <FormControl fullWidth error={!isPasswordValid()} variant="outlined">
              <SuccessInputLabel htmlFor="outlined-password" required success={isPasswordValid()}>New password</SuccessInputLabel>
              <SuccessOutlinedInput
                  id="outlined-password"
                  label="Ne password"
                  type={showPassword?"text": "password"}
                  placeholder="Entrer mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position={"start"}>
                      <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  success={isPasswordValid()}
              />
              <FormHelperText>{ passwordErrMsg }</FormHelperText>
            </FormControl>
          </div>
          <div className={styles.inputContainer}>
            <SuccessTextField
              label="Confirm password"
              type={"password"}
              value={retypePassword}
              onChange={handleRetypePasswordChange}
              placeholder="Confirmer le mot de passe"
              error={errorMessage.length>0}
              success={isConfirmationValid()}
              helperText={errorMessage}
              required
              fullWidth

            />
          </div>
          {/*<button type="submit" className="submit" style={{ marginTop: "25px" }} disabled={errorMessage !== ""}>
            Changer Mot de passe
          </button>
          */}
          <div className={styles.submit}>
            <IsimmButton onClick={activateAccount} loading={isLoading}>Activer</IsimmButton>
          </div>
        </form>
      </div>    
    </div>
  );
}