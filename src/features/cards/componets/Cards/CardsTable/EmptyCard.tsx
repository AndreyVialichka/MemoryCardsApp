import { Box, IconButton, Typography } from "@mui/material"
import AddCardModal from "../CardsModals/AddCardModal"
import { useAppSelector } from "common/hooks"
import { userIDSelector } from "features/auth/auth.selectors"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type EmptyCardPropsType = {
    userID:string
}

const EmptyCard = (props:EmptyCardPropsType) => {

    const user_id = useAppSelector(userIDSelector)
    const navigate = useNavigate()

    const handleBackToPackList = () => {
        navigate('/packs')
    }


    return (
        <Box sx={{display:'flex', flexDirection:'column',width:'100%', height:'100vh', alignItems:"center",justifyContent:'center', gap:'50px'}}>
            <Typography id="modal-modal-title" variant="h6" component="h2" color='#a4a4a4'>
                This pack is empty.Click add new card to fill this pack
            </Typography>
            {user_id === props.userID 
                ? <AddCardModal /> 
                : <IconButton aria-label="create" onClick={handleBackToPackList}>
                        <ArrowBackIcon /><b>Back to pack list</b>
                </IconButton>
             }
        </Box>
    )
}

export default EmptyCard