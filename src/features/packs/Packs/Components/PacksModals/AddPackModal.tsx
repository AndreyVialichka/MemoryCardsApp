import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { useState } from "react";
import { Divider, TextField } from "@mui/material";
import s from "./styles.module.css";
import { toast } from "react-toastify";
import { userIDSelector } from "features/packs/packs.selector";

const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddPackModal() {
  const [packName, setNewPackName] = useState<string>("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const user_id = useAppSelector(userIDSelector);

  const { createPack } = useActions(packsThunks);

  const addPackHandler = () => {
    const sortColumn = {
      name: packName,
      user_id: user_id,
    };
    createPack(sortColumn)
      .unwrap()
      .then((res) => {
        const PackName = res.pack.name;
        toast.success(`Карточка ${PackName} успешно добавлена`);
      })
      .catch((err) => {
        toast.error(err.data.error);
      });
  };
  const handlePackNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.target.value);
  };

  return (
    <div className={s.AddPackModal}>
      <Button
        aria-label="create"
        variant="contained"
        onClick={handleEditModalOpen}
      >
        ADD PACK
      </Button>

      <Modal
        open={openEditModal}
        onClose={handleEditModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Pack
            </Typography>
            <Divider />
            <TextField
              id="standard-basic"
              variant="standard"
              value={packName}
              onChange={handlePackNameChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                disabled={packName.length === 0}
                onClick={() => {
                  addPackHandler();
                  handleEditModalClose();
                }}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleEditModalClose}>
                Cansel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
