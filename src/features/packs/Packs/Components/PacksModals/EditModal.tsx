import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useActions } from 'common/hooks';
import { packsThunks } from 'features/packs/packs.slice';
import { PackType } from 'features/packs/packs.api';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Divider, IconButton, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  flexDirection:'column',
  justifyContent:'center',
  contentAlign:'center',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type EditModalType = {
    pack:PackType,
}



export default function EditModal(props:EditModalType) {
  const [packName, setNewPackName] = useState< string | null>(props.pack.name);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);


  const { updatePack } = useActions(packsThunks);

  const updatePackHandler = (pack: PackType) => {
    if(packName) updatePack({ ...pack, name: packName }).unwrap()
            .then((res) => {
                toast.success(`Имя пака успешно изменено`);
            })
            .catch((err) => {
                toast.error(err.data.error);
            });;;
  };

  const handlePackNameChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setNewPackName(e.target.value)
  }

  return (
    <div>
      <IconButton aria-label="edit" onClick={handleEditModalOpen}>
                    <CreateIcon />
       </IconButton>
      <Modal
        open={openEditModal}
        onClose={handleEditModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
        <Box sx={{display:'flex', flexDirection:'column',gap:'40px', alignContent:"center"}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Pack
          </Typography>
          <Divider />
          <TextField id="standard-basic"  variant="standard" value={packName} onChange={handlePackNameChange}/>
            <Box sx={{display:'flex', justifyContent:'space-between',width:"100%"}}>
            <Button 
              variant="contained" 
              disabled ={packName?.length === 0}
              onClick={() => {
                updatePackHandler(props.pack)
                handleEditModalClose()
            }}>Save</Button>
            <Button variant="outlined" onClick={ handleEditModalClose }>Cansel</Button>
            </Box>
        </Box>
      </Box>
    </Modal>
  </div>
  );
}
