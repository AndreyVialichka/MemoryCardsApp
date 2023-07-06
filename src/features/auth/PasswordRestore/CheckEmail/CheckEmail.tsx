
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";


export default function CheckEmail() {
    return (
      <div >
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
          component="h2"> 
            Check Email 
        </Typography>
        <div >
          <Typography>We’ve sent an Email with instructions to example@mail.com </Typography>
        </div>
        <div >  
          <Link replace to={`/login`} >Back To Login</Link>
        </div>
        </Box>
      </div>  
    )
}
