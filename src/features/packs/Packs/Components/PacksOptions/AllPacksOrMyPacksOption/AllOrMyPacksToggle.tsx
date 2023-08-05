import * as React from "react";
import Box from "@mui/material/Box";
import { packsActions } from "features/packs/packs.slice";
import { useActions } from "common/hooks";
import { Button, Typography } from "@mui/material";
import s from "./styles.module.css";

export default function AllOrMyPacksToggle() {
  const { ChangeAllPacksOrMyPacksOption } = useActions(packsActions);

  const handleChangeMyClick = () => {
    ChangeAllPacksOrMyPacksOption(true);
  };
  const handleChangeAllClick = () => {
    ChangeAllPacksOrMyPacksOption(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          display: "flex",
          justifyContent: "space-between",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Show packs cards
      </Typography>
      <div>
        <Button
          variant="outlined"
          className={s.button}
          onClick={handleChangeMyClick}
        >
          MY
        </Button>
        <Button
          variant="contained"
          className={s.button}
          onClick={handleChangeAllClick}
        >
          ALL
        </Button>
      </div>
    </Box>
  );
}
