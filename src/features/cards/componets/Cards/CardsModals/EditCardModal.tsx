import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Divider, IconButton, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useUpdateCardMutation } from "features/cards/service/cards.api";
import { CardType } from "features/cards/service/cards.api.types";
import CreateIcon from "@mui/icons-material/Create";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type AddCardModalProps = {
  card: CardType;
};

export default function EditCardModal(props: AddCardModalProps) {
  const [cardAnswer, setNewCardAnswer] = useState<string>("");
  const [cardQuestion, setNewCardQuestion] = useState<string>("");

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const [updateCard] = useUpdateCardMutation();

  const updateCardHandler = (card: CardType) => {
    const newCard = { ...card, question: cardQuestion, answer: cardAnswer };
    updateCard(newCard)
      .unwrap()
      .then((res) => {
        toast.success(`Карточка успешно изменена`);
      })
      .catch((err) => {
        toast.error(err.data.error);
      });
  };

  const handleCardQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardQuestion(e.target.value);
  };

  const handleCardAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardAnswer(e.target.value);
  };

  return (
    <div>
      <IconButton aria-label="create" onClick={handleEditModalOpen}>
        <CreateIcon />
      </IconButton>
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
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Card
            </Typography>
            <Divider />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Question"
              value={cardQuestion}
              onChange={handleCardQuestionChange}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              label="Answer"
              value={cardAnswer}
              onChange={handleCardAnswerChange}
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
                disabled={cardQuestion.length === 0 || cardAnswer.length === 0}
                onClick={() => {
                  updateCardHandler(props.card);
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
