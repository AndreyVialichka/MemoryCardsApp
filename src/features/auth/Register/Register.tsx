import { authThunks } from "features/auth/auth.slice";
import s from "features/auth/Register/styles.module.css";
import { useActions } from "common/hooks";
import { useEffect, useState } from "react";
import { commonActions } from "common/actions/unhandle.action";
import { appActions } from "app/app.slice";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Register = () => {
  // const { register } = useActions(authThunks);
  // const { unHandleAction } = useActions(commonActions);
  const [loginValue,setLoginValue] = useState('')
  const [passwordValue,setPasswordValue] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassportValue,setConfirmedPassportValue] = useState('')



  const { register, unHandleAction } = useActions({
    ...commonActions,
    ...authThunks,
  });

  useEffect(() => {
    const res = unHandleAction();
  }, []);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const registerHandler = () => {
    const payload = {
      email: loginValue,
      password: passwordValue,
    };
    debugger
    register(payload).unwrap().then((res) => {
      toast.success(`Вы успешно зарегестрировались`);
    })
    .catch((err) => {
      toast.error(err.data.error);
    });
  };

  return (
    <div >
      <form >
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
        REGISTERATION
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
        <TextField 
                    sx={{width:'300px'}}  
                    variant="standard" 
                    label ="Confirm Password" 
                    type={showPassword ? 'text' : 'password'}
                    value={confirmedPassportValue}
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
                    onChange={(e) => {setConfirmedPassportValue(e.currentTarget.value)}}
        />
        {passwordValue !== confirmedPassportValue 
          ? <Typography 
            id="form-login-title" 
            variant="h6" 
            component="h4"
            color={'red'}
            > You shoud confirm password
          </Typography>
          :<></>  
        }
        <Button 
          variant="contained"
          disabled = {passwordValue !== confirmedPassportValue} 
          onClick={registerHandler}
          
        >
          Sign up
        </Button>
        <Typography 
            id="form-login-title" 
            variant="h6" 
            component="h2"> Alredy have an account ?
        </Typography>
        <Link replace to={`/login`} >Sign In</Link>  
      </Box>  
      </form>
    </div>
  );
};
