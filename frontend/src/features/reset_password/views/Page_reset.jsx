import React, {useEffect, useState, useLayoutEffect} from 'react';
import styles from "../assets/page_reset.module.css";
import logo_isimm from "../assets/logo_isimm.jpeg";                                                                    
import isimm_photo from "../assets/isimm_photo.webp";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  keyframes,
  OutlinedInput,
  TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const isimm_main = "#115eee"
const isimm_dark = "#0a4bc4"
const isimm_text = "#fff"

const SuccessOutlinedInput = styled(OutlinedInput)(({ theme, success }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderWidth: success ? '2px' : '1px',  // Thicker border when valid
    borderColor: success ? theme.palette.success.main : undefined,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderWidth: success ? '2px' : '1px',
    borderColor: success ? theme.palette.success.main : undefined,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderWidth: '2px',
    borderColor: success ? theme.palette.success.main: theme.palette.error.main,
  },
}));
const SuccessTextField = styled(TextField)(({ theme, success }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: success ? '2px' : '1px',
      borderColor: success ? theme.palette.success.main : undefined,
    },
    '&:hover fieldset': {
      borderWidth: success ? '2px' : '1px',
      borderColor: success ? theme.palette.success.main : undefined,
    },
    '&.Mui-focused fieldset': {
      borderWidth: '2px',
      borderColor: success ? theme.palette.success.main : undefined,
    },
  },
  '& .MuiInputLabel-root': {
    color: success ? theme.palette.success.main : undefined,
    '&.Mui-focused': {
      color: success ? theme.palette.success.main :undefined,
    }
  }
}));
const SuccessInputLabel = styled(InputLabel)(({ theme, success }) => ({
  '&.MuiInputLabel-root': {
    color: success ? theme.palette.success.main : undefined,
    '&.Mui-focused': {
      color: success ? theme.palette.success.main : theme.palette.error.main,
    }
  }
}));

const IsimmButton = styled(Button)(({ theme }) => ({
  backgroundColor: isimm_main,
  color: isimm_text,
  padding: '10px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  textTransform: 'none',

  '&:hover': {
    backgroundColor: isimm_dark,
    boxShadow: '0 4px 12px rgba(17, 94, 238, 0.3)',
  },


  '&.Mui-disabled': {
    backgroundColor: 'rgba(17, 94, 238, 0.5)',
    color: 'rgba(255, 255, 255, 0.7)',
  },

  // Ripple effect color
  '& .MuiTouchRipple-root': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
}));

export default function Page_reset() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [retypePassword, setRetypePassword] = useState("");
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [resetToken,setResetToken] = useState("")


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

  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search)
    if(params.get("token")){
      setResetToken(params.get("token"))
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
        <form>
          <p className={styles.formTitle}>Réinitialiser le mot de passe</p>
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
          <IsimmButton>Changer mot de passe</IsimmButton>
        </form>
      </div>    
    </div>
  );
}

/*<input
  type="password"
  placeholder="Entrer mot de passe"
  value={password}
  onChange={handlePasswordChange}
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
  title=""
  required
></input>*/