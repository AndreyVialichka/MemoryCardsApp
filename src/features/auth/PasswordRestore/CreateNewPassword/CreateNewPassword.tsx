import { authThunks } from "features/auth/auth.slice";
import {  useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useActions } from "common/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";



type Inputs = {
  password: string,
};


export default function SetNewPasswordPage() {

  const [passwordValue,setPasswordValue] = useState('')
  let {token} = useParams<{ token: string }>();

  const { setNewPassword } = useActions(authThunks);

  const navigate = useNavigate();
 
  const onClickHandler = () => {
    let payload = {
      password: passwordValue,
      resetPasswordToken : token
    }
    setNewPassword(payload).then((res) => {
      toast.success(`Пароль успешно изменён`);
    })
    .catch((err) => {
      toast.error(err.data.error);
    });;
    navigate("/login")
  };

  return (
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
      <Typography 
        id="form-login-title" 
        variant="h6" 
        component="h2"
      >
        Create New Password
      </Typography>

      <div>
        <TextField 
                    id="standard-basic"  
                    variant="standard" 
                    label ="Password" 
                    type="password"
                    value={passwordValue} 
                    onChange={(e) => {setPasswordValue(e.currentTarget.value)}}
        />
        
        <Typography 
          id="form-login-title" 
          variant="h6" 
          component="h2">
            Create new password and we will send you further instructions to email 
          </Typography>
        
      </div>

      <Button 
          variant="contained" 
          onClick={onClickHandler}
        >
          Click
      </Button>
      </Box>  
    </form>
  )
}
