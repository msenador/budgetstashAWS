import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const date = new Date();
const month = date.getMonth();

const convertMonth = (currentMonth) => {
  switch (currentMonth) {
    case 0:
      return 0;
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 3;
    case 4:
      return 4;
    case 5:
      return 5;
    case 6:
      return 6;
    case 7:
      return 7;
    case 8:
      return 8;
    case 9:
      return 9;
    case 10:
      return 10;
    case 11:
      return 11;
  }
};

const MemberContentMobile = () => {
  const [currentMonthSelected, setCurrentMonthSelected] = React.useState(convertMonth(month));

  const handleMonthChange = (event) => {
    setCurrentMonthSelected(event.target.value);
  };

  return (
    <Box>
      <Box style={{ textAlign: 'center' }}>
        <Box fontStyle="italic" marginTop={2}>
          Choose Month
        </Box>
        <Box marginTop={1}>
          <FormControl fullWidth={200}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select value={currentMonthSelected} label="Month" onChange={handleMonthChange}>
              <MenuItem value={0}>January</MenuItem>
              <MenuItem value={1}>February</MenuItem>
              <MenuItem value={2}>March</MenuItem>
              <MenuItem value={3}>April</MenuItem>
              <MenuItem value={4}>May</MenuItem>
              <MenuItem value={5}>June</MenuItem>
              <MenuItem value={6}>July</MenuItem>
              <MenuItem value={7}>August</MenuItem>
              <MenuItem value={8}>September</MenuItem>
              <MenuItem value={9}>October</MenuItem>
              <MenuItem value={10}>November</MenuItem>
              <MenuItem value={11}>December</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <hr style={{ width: '80%' }} />
    </Box>
  );
};

export default MemberContentMobile;
