import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'common/hooks/useDebounse';
import { Typography } from '@mui/material';




type CardSearchPropsType = {
  Question: string
  handleChangeSearchValue: (Question:string) => void
}

export default function CardsSearch(props:CardSearchPropsType) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.handleChangeSearchValue(event.target.value)
    }


  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { marginLeft: 5, width: '90%', display:'flex',alignItems:"center", },
    }}
    noValidate
    autoComplete="off"
  > 
    <Typography id="modal-modal-title" variant="h6" component="h2">
          Search
    </Typography>
      <TextField
        id="outlined-controlled"
        fullWidth

        value={props.Question}
        onChange={handleChange}
      />
    </Box>
  );
}
