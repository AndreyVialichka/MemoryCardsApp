import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { packsActions } from 'features/packs/packs.slice';
import { useActions } from 'common/hooks';
import { Typography } from '@mui/material';
import s from './styles.module.css'

type PacksSearchType = {
    SearchValue:string
}


export default function PacksSearch(props:PacksSearchType) {
  const { PackSearch } = useActions(packsActions);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        PackSearch(event.target.value)
    }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '60ch', display:'flex',alignItems:"center", },
      }}
      noValidate
      autoComplete="off"
    > 
      <Typography id="modal-modal-title" variant="h6" component="h2">
            Search
      </Typography>
      <TextField
        
        fullWidth
        label="provide your text"
        value={props.SearchValue}
        onChange={handleChange}
      />
    </Box>
  );
}
