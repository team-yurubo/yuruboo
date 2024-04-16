import * as React from 'react';
import Fab from '@mui/material/Fab';
import Icon from '@mui/material/Icon';
import { Box, ThemeProvider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { styled } from '@mui/material/styles';

type Props = {
  pinFilter: PinFilter;
};

export const GooglemapFilter = (props: Props) => {
	const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    // <FilterButton
    // 	color="secondary"
    // >
    // </FilterButton>
      <Box
        sx={{
          width: 125,
          height: 55,
          borderRadius: 1,
          bgcolor: '#fff',
					position:'fixed',
					left: 85,
					bottom: 12.5,
					border:5,
					borderColor:'primary.main',
        }}
      >
				<FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="タグ"
					defaultValue="all"
					// onChange={(e) => props.handleSort(e.target.value as Filter)}
        >
          <MenuItem value="all">すべて</MenuItem>
					<MenuItem value="ramen">ラーメン</MenuItem>
					<MenuItem value="nomi">飲み</MenuItem>
					<MenuItem value="sightseeing">観光</MenuItem>
					<MenuItem value="movie">映画</MenuItem>
        </Select>
      </FormControl>
			</Box>
  );
};