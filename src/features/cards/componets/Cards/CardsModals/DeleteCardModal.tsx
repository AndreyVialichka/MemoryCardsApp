import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useActions } from 'common/hooks';
import { packsThunks } from 'features/packs/packs.slice';
import { PackType } from 'features/packs/packs.api';
import { useState } from 'react';
import { Divider, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { CardType } from 'features/cards/service/cards.api.types';
import { useDeleteCardMutation } from 'features/cards/service/cards.api';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type DeleteCardModalType = {
  card : CardType,
  page : number,
  pageCount : number
}



export default function DeleteCardModal(props:DeleteCardModalType) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const [deleteCard, {isLoading: isDeletedLoading}] = useDeleteCardMutation()


  const removeCardHandler = (card: CardType) => {
		deleteCard({packId: card.cardsPack_id, page: props.page, pageCount:props.pageCount, cardId: card._id}).unwrap()
          .then((res) => {
              toast.success(`Карточка успешно удалена`);
          })
          .catch((err) => {
              toast.error(err.data.error);
          });
	};


  return (
    <div>
      <IconButton aria-label="edit" onClick={handleEditModalOpen}>
                    <DeleteIcon />
       </IconButton>
      <Modal
        open={openEditModal}
        onClose={handleEditModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{display:'flex', flexDirection:'column',gap:'40px', alignContent:"center", justifyContent:"center"}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Card
          </Typography>
          <Divider />
          <Typography sx={{width:'50%' , m:'auto'}} variant="h6" component="h2">
            Are you sure ?
          </Typography>
          <Box sx={{display:'flex', justifyContent:'space-between',width:"100%"}}>
            <Button 
                variant="contained"
                color='error'
                onClick={() => {
                removeCardHandler(props.card)
                handleEditModalClose()
            }}
                
                >Delete</Button>
            <Button variant="outlined" onClick={ handleEditModalClose }>Cansel</Button>
            </Box>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}
