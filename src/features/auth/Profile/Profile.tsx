import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {  useState } from 'react';
import { Avatar, Divider, IconButton, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import emptyAvatar from '../../../common/assets/avatar.png'
import { userEmailSelector, userNameSelector } from '../auth.selectors';
import { useActions, useAppSelector } from 'common/hooks';
import CreateIcon from '@mui/icons-material/Create';
import {authThunks } from '../auth.slice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



export default function Profile() {
    const [editMode,setEditMode] = useState(false)

    const userName = useAppSelector(userNameSelector)
    const userEmail = useAppSelector(userEmailSelector)

    const [inputNameValue,setInputNameValue] = useState(userName)
    const navigate = useNavigate()


    const {  logut , setNameAndAvatar } = useActions(authThunks);


    const handleEditUserName = () => {
        setEditMode(!editMode)
    }

    const handleInputUserNameChange = (e:any) => {
        setInputNameValue(e.currentTarget.value)
    }

    const handleSaveUserName = () => {
        setNameAndAvatar({
            name:inputNameValue
        }).unwrap()
        .then((res) => {
          toast.success("Имя успешно измененно");
        })
        .catch((err) => {
          toast.error(err.e.response.data.error);
        });
        handleEditUserName()
    }

    const handleBackToPackList = () => {
        navigate('/packs')
    }
    
    const handleLogut = () => {
        logut()
        navigate('/login')
    }
  return (
    <div>
        <IconButton aria-label="create" onClick={handleBackToPackList}>
                    <ArrowBackIcon /><b>Back to pack list</b>
        </IconButton>
        <Box sx={{
                display:'flex',
                flexDirection:'column',
                gap:'40px',  
                justifyContent:"center",
                width:'15%',
                margin:'100px auto',
                padding:"50px",
                backgroundColor:'white'
                
                }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Personal Information</b>
          </Typography>
          <Avatar alt="Avatar" sx={{
            width:'100px',
            height:'100px'
          }} src={emptyAvatar} />

          <Divider />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editMode 
            ? <Box>
                <TextField id="standard-basic"  variant="standard" label ="Question" value={inputNameValue} onChange={handleInputUserNameChange}/>
                <Button variant="contained" onClick={ handleSaveUserName }>Save</Button>
                </Box>
            : <Box>
                {userName}
                <IconButton aria-label="create" onClick={handleEditUserName}>
                    <CreateIcon />
                </IconButton>
            </Box>}
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {userEmail}
          </Typography> 

          <Box sx={{display:'flex', justifyContent:'space-between',width:"100%"}}>
            <Button variant="outlined" onClick={ handleLogut }>Log out</Button>
          </Box>  
        </Box>
    </div>
  );
}
