import { authThunks } from "features/auth/auth.slice";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "common/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";






function ForgotPasport() {

    const [EmailValue,setEmailValue] = useState('')

    const { forgotPassword } = useActions(authThunks);
    const navigate = useNavigate();

    const onClickHandler = () => {
      let payload = {
        email: EmailValue,
        from : "test-front-admin <ai73a@yandex.by>",
        message: `<div style="background-color: lime; padding: 15px">
        password recovery link: 
        <a href='http://localhost:3000/createnewpassword/$token$'>
        link</a>
        </div>`
      }
      forgotPassword(payload)
      navigate("/checkemail")
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
          <Typography id="form-login-title" variant="h6" component="h2">Forgot your password ?</Typography>


          <TextField  id="standard-basic"  
                          variant="standard" 
                          label ="Email" 
                          value={EmailValue} 
                          onChange={(e) => {setEmailValue(e.currentTarget.value)}}
          />
          <Typography id="form-login-title" 
                          variant="h6" 
                          component="h2">
                              Enter your email address and we will send you further instructions 
          </Typography>
          <Button 
            variant="contained" 
            onClick={onClickHandler}
            value = 'SEND INSTRUCTIONS'
          >SEND INSTRUCTIONS</Button>

            <Typography>Did you remember your password?</Typography>
            <Link replace to={`/login`} >Try to logging in</Link>
          </Box>
        </form>
      </div>  
    )
}


export default ForgotPasport