import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useActions } from 'common/hooks';
import { packsActions } from 'features/packs/packs.slice';
import { Typography } from '@mui/material';
import s from "./styles.module.css"

type PackCountType = {
    MinAndMaxValue : Array<number>
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function PacksCount(props:PackCountType) {
  const [value, setValue] = React.useState<number[]>([props.MinAndMaxValue[0], props.MinAndMaxValue[1]]);
  const { changeMinandMaxCardsCount } = useActions(packsActions);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCommitedChange = () => {
    changeMinandMaxCardsCount([value[0],value[1]])
  }

  return (
    <Box sx={{ width: 400, marginLeft:15 }}>
      <Typography  variant="h6" component="h2">
            Number of cards
      </Typography>
      <div className={s.slider}>
        <Typography variant="h6" component="h2" className={s.numbers} >
              {value[0]}
        </Typography>
        <Slider
          sx={{width:300}}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          onChangeCommitted={handleCommitedChange}
        />
        <div className={s.numbers}>
        <Typography variant="h6" component="h2" className={s.numbers}>
              {value[1]}
        </Typography>
        </div>
      </div>
    </Box>
  );
}
