import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Line } from 'rc-progress';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

import UserContext from '../context/UserContext';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import { MAIN_BLUE } from '../theme';

const PrimaryBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #344966;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #344966;
    }
  }
`;

const spinnerCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const date = new Date();
const month = date.getMonth();

const convertMonth = (currentMonth) => {
  switch (currentMonth) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
};

const MemberContentMobile = () => {
  let dataForProgressBars = [];

  const [currentMonthSelected, setCurrentMonthSelected] = React.useState(convertMonth(month));
  const [notification, setNotification] = React.useState('');
  const [itemName, setItemName] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [itemCategory, setItemCategory] = React.useState('');

  const { currentUser, setCurrentUser } = React.useContext(UserContext);
  const { spinnerModal, setSpinnerModal } = React.useContext(SpinnerModalContext);

  const januaryTotal = () => {
    const prices = currentUser.January.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const februaryTotal = () => {
    const prices = currentUser.February.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const marchTotal = () => {
    const prices = currentUser.March.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const aprilTotal = () => {
    const prices = currentUser.April.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const mayTotal = () => {
    const prices = currentUser.May.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const juneTotal = () => {
    const prices = currentUser.June.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const julyTotal = () => {
    const prices = currentUser.July.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const augustTotal = () => {
    const prices = currentUser.August.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const septemberTotal = () => {
    const prices = currentUser.September.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const octoberTotal = () => {
    const prices = currentUser.October.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const novemberTotal = () => {
    const prices = currentUser.November.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const decemberTotal = () => {
    const prices = currentUser.December.map((item) =>
      parseFloat(parseFloat(item.itemPrice).toFixed(2))
    );
    return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
  };

  const getMonthlyTotal = () => {
    switch (currentMonthSelected) {
      case 'January':
        return januaryTotal();
      case 'February':
        return februaryTotal();
      case 'March':
        return marchTotal();
      case 'April':
        return aprilTotal();
      case 'May':
        return mayTotal();
      case 'June':
        return juneTotal();
      case 'July':
        return julyTotal();
      case 'August':
        return augustTotal();
      case 'September':
        return septemberTotal();
      case 'October':
        return octoberTotal();
      case 'November':
        return novemberTotal();
      case 'December':
        return decemberTotal();
    }
  };

  const handleMonthChange = (event) => {
    setCurrentMonthSelected(event.target.value);
  };

  const progressBarsData = (currentUser, currentMonthSelected) => {
    let seen = [];

    currentUser[currentMonthSelected].map((userItem) => {
      if (!seen.includes(userItem.category)) {
        let data = {
          total: userItem.itemPrice,
          category: userItem.category
        };
        dataForProgressBars.push(data);
        seen.push(userItem.category);
      } else {
        dataForProgressBars.map((dataItem) => {
          if (dataItem.category === userItem.category) {
            dataItem.total = parseFloat(dataItem.total) + parseFloat(userItem.itemPrice);
          }
        });
      }
    });
  };

  React.useMemo(() => {
    progressBarsData(currentUser, currentMonthSelected);
  }, [dataForProgressBars]);

  const handleDeleteItem = async (email, monthSelected, index) => {
    setSpinnerModal(true);
    const requestBody = {
      email: email,
      monthSelected: monthSelected,
      index: index
    };

    try {
      const res = await fetch(
        'https://80uthhqr2j.execute-api.us-east-1.amazonaws.com/prod/delete-item',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'tERGwOFDPqasKeo78uWbw3T5AOWKUmVm4sS8DT0W'
          },
          body: JSON.stringify(requestBody)
        }
      );

      switch (res.status) {
        case 200:
          setNotification('Item Delete');
          setSpinnerModal(false);
      }

      const data = await res.json();
      setCurrentUser(data.Items[0]);
      localStorage.setItem('userEmail', JSON.stringify(currentUser));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddItem = async () => {
    setSpinnerModal(true);

    if (!itemPrice || !itemName || !itemCategory) {
      setNotification('All fields are required');
      setSpinnerModal(false);
      return;
    }

    const requestBody = {
      email: currentUser.email,
      itemName: itemName,
      itemPrice: parseFloat(itemPrice).toFixed(2),
      category: itemCategory,
      monthSelected: currentMonthSelected
    };

    try {
      const res = await fetch(
        'https://80uthhqr2j.execute-api.us-east-1.amazonaws.com/prod/add-item',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'gYwr5Yk46k65h34MZelISaJU1NijMJkZ98l0CI0j'
          },
          body: JSON.stringify(requestBody)
        }
      );

      switch (res.status) {
        case 400:
          setNotification('All fields are required');
          setSpinnerModal(false);
          return;
        case 200:
          setNotification('');
          setItemName('');
          setItemPrice('');
          setItemCategory('');
          setSpinnerModal(false);
      }

      const data = await res.json();
      setCurrentUser(data.Items[0]);
      localStorage.setItem('userEmail', JSON.stringify(currentUser));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setNotification('');
  }, [currentMonthSelected]);

  return (
    <Box>
      <Box style={{ textAlign: 'center' }}>
        <Box fontStyle="italic" marginTop={2} fontWeight="700">
          Choose Month
        </Box>
        <Box marginTop={1}>
          <FormControl style={{ width: '70%' }}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select value={currentMonthSelected} label="Month" onChange={handleMonthChange}>
              <MenuItem value={'January'}>January</MenuItem>
              <MenuItem value={'February'}>February</MenuItem>
              <MenuItem value={'March'}>March</MenuItem>
              <MenuItem value={'April'}>April</MenuItem>
              <MenuItem value={'May'}>May</MenuItem>
              <MenuItem value={'June'}>June</MenuItem>
              <MenuItem value={'July'}>July</MenuItem>
              <MenuItem value={'August'}>August</MenuItem>
              <MenuItem value={'September'}>September</MenuItem>
              <MenuItem value={'October'}>October</MenuItem>
              <MenuItem value={'November'}>November</MenuItem>
              <MenuItem value={'December'}>December</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <hr style={{ width: '80%' }} />

      <Box fontStyle="italic" marginTop={2} fontWeight="700" style={{ textAlign: 'center' }}>
        Enter New Item
      </Box>
      <Box style={{ display: 'flex', justifyContent: 'center', gap: '5px', padding: '20px' }}>
        <PrimaryBorderTextField
          id="item-category"
          label="Category"
          placeholder="Shopping"
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
        />
        <PrimaryBorderTextField
          id="item-name"
          label="Name"
          placeholder="Shirt"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <PrimaryBorderTextField
          id="item-price"
          label="Price"
          placeholder="2.99"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          type="number"
        />
      </Box>
      <Box style={{ width: '100%', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          style={{ width: '70%' }}>
          Add Item
        </Button>
      </Box>

      <Box
        style={{
          color: 'red',
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center'
        }}>
        {notification && <Box>*{notification}</Box>}
      </Box>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>Total spent: ${parseFloat(getMonthlyTotal()).toFixed(2)}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ fontWeight: '900', display: 'flex', justifyContent: 'space-between' }}>
            <Box>Category</Box>
            <Box>%</Box>
            <Box>Dollar Amount</Box>
          </Box>

          {dataForProgressBars.length > 0 ? (
            <Box
              style={{
                padding: '20px',
                width: '90%'
              }}>
              {dataForProgressBars &&
                dataForProgressBars
                  .sort((a, b) => b.total - a.total)
                  .map((item) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box style={{ fontWeight: '700' }}>{item.category.toUpperCase()}</Box>
                          <Box>{((item.total / getMonthlyTotal()) * 100).toFixed(2)}%</Box>
                          <Box>{`($${parseFloat(item.total).toFixed(2)})`}</Box>
                        </Box>
                        <Line
                          percent={((item.total / getMonthlyTotal()) * 100).toFixed(2)}
                          strokeWidth={4}
                          strokeColor="lightblue"
                        />
                      </Box>
                    );
                  })}
            </Box>
          ) : (
            <Box style={{ textAlign: 'center' }}>
              <h1>No Items</h1>
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>Spending Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900' }}>
            <Box>Count ({currentUser[currentMonthSelected].length})</Box>
            <Box>Item</Box>
            <Box>Price</Box>
            <Box>Date</Box>
            <Box>Category</Box>
          </Box>

          <Box>
            {currentUser[currentMonthSelected].length > 0 ? (
              currentUser[currentMonthSelected].map((item, index) => {
                return (
                  <Box
                    key={`${item.itemName} - ${item.price}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: index % 2 === 0 ? 'aliceblue' : ''
                    }}>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        textAlign: 'center'
                      }}>
                      <Box>{index + 1}</Box>
                      <Box>
                        <button
                          onClick={() =>
                            handleDeleteItem(currentUser.email, currentMonthSelected, index)
                          }
                          style={{
                            color: 'white',
                            border: 'none',
                            backgroundColor: '#E24E1B',
                            cursor: 'pointer'
                          }}>
                          <Box>Delete</Box>
                        </button>
                      </Box>
                    </Box>

                    <Box
                      style={{
                        width: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                      <Box style={{ width: '100px', display: 'flex', justifyContent: 'center' }}>
                        {item.itemName}
                      </Box>
                    </Box>

                    <Box style={{ width: '100px', display: 'flex', justifyContent: 'flex-start' }}>
                      ${item.itemPrice}
                    </Box>

                    <Box style={{ width: '100px' }}>{item.date}</Box>

                    <Box style={{ width: '100px', display: 'flex', justifyContent: 'end' }}>
                      {item.category}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <h1 style={{ textAlign: 'center' }}>No Items</h1>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Modal ariaHideApp={false} isOpen={spinnerModal} style={spinnerCustomStyles}>
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default MemberContentMobile;
