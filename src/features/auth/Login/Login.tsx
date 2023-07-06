import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/Register/styles.module.css";
import { useActions } from "common/hooks";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [loginValue,setLoginValue] = useState('')
  const [passwordValue,setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false);


  const { login } = useActions(authThunks);
  const navigate = useNavigate();
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const loginHandler = () => {
    debugger
    const payload = {
      email: loginValue,
      password: passwordValue,
      rememberMe: false,
    };
    login(payload)
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно залогинились");
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <div >
      <form className={s.container}>
        <Box sx={ 
            { 
              display:'flex',
              flexDirection:'column',
              width:'20%',
              height:'45vh',
              alignItems:'center',
              gap:"20px", 
              backgroundColor:"white",
              m:'auto',
              marginTop:'140px',
              padding:'20px'
              
            }}>
        <Typography id="form-login-title" variant="h6" component="h2">
            Login
        </Typography>
        <TextField  sx={{width:'300px'}}
                    variant="standard" 
                    label ="Login" 
                    value={loginValue} 
                    onChange={(e) => {setLoginValue(e.currentTarget.value)}}
        />
        <TextField 
                    sx={{width:'300px'}}  
                    variant="standard" 
                    label ="Password" 
                    type={showPassword ? 'text' : 'password'}
                    value={passwordValue}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                          >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>  
                        </InputAdornment>
                      ),
                    }} 
                    onChange={(e) => {setPasswordValue(e.currentTarget.value)}}
        />
        <Button 
          variant="contained" 
          onClick={loginHandler}
        >
          LOGIN
        </Button>
        <Link to={`/forgotpassword`}>Foggot Password ?</Link>
        <Typography 
            id="form-login-title" 
            variant="h6" 
            component="h2"> Don't have an account ?
        </Typography>
        <Link replace to={`/register`} >Sign Up</Link>
        </Box>
      </form>

    </div>
  );
};
