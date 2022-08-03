import styled from 'styled-components';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Button, TextField } from '@mui/material';

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

const MemberContent = () => {
  const [currentMonthSelected, setCurrentMonthSelected] = useState(convertMonth(month));
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  // const [notification, setNotification] = useState('');

  const { currentUser, setCurrentUser } = useContext(UserContext);

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

  const handleAddItem = async () => {
    const requestBody = {
      email: currentUser.email,
      itemName: itemName,
      itemPrice: itemPrice,
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
      // .then((response) => {
      //   console.log('json: ', response.json());
      //   response.json();
      // })
      // .then((data) => {
      //   console.log(data);
      // });

      const data = await res.json();
      console.log('DT: ', data.Items[0]);
      setCurrentUser(data.Items[0]);
      localStorage.setItem('userEmail', JSON.stringify(currentUser));

      // switch (res.status) {
      //   case 400:
      //     setNotification('All fields are required');
      //     return;
      //   case 200:
      //     setNotification('Item Added');
      //     return;
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box padding={'100px'}>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Button
          onClick={() => setCurrentMonthSelected('January')}
          color="primary"
          variant={currentMonthSelected === 'January' ? 'contained' : 'outlined'}>
          January
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('February')}
          color="primary"
          variant={currentMonthSelected === 'February' ? 'contained' : 'outlined'}>
          February
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('March')}
          color="primary"
          variant={currentMonthSelected === 'March' ? 'contained' : 'outlined'}>
          March
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('April')}
          color="primary"
          variant={currentMonthSelected === 'April' ? 'contained' : 'outlined'}>
          April
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('May')}
          color="primary"
          variant={currentMonthSelected === 'May' ? 'contained' : 'outlined'}>
          May
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('June')}
          color="primary"
          variant={currentMonthSelected === 'June' ? 'contained' : 'outlined'}>
          June
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('July')}
          color="primary"
          variant={currentMonthSelected === 'July' ? 'contained' : 'outlined'}>
          July
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('August')}
          color="primary"
          variant={currentMonthSelected === 'August' ? 'contained' : 'outlined'}>
          August
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('September')}
          color="primary"
          variant={currentMonthSelected === 'September' ? 'contained' : 'outlined'}>
          September
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('October')}
          color="primary"
          variant={currentMonthSelected === 'October' ? 'contained' : 'outlined'}>
          October
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('November')}
          color="primary"
          variant={currentMonthSelected === 'November' ? 'contained' : 'outlined'}>
          November
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('December')}
          color="primary"
          variant={currentMonthSelected === 'December' ? 'contained' : 'outlined'}>
          December
        </Button>
      </Box>
      <h1>{currentMonthSelected} Overview</h1>
      <h3>Total spent this month: {parseFloat(getMonthlyTotal()).toFixed(2)}</h3>

      <PrimaryBorderTextField
        id="item-name"
        label="Name"
        placeholder="Item name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <PrimaryBorderTextField
        id="item-price"
        label="Price"
        placeholder="Item price"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
      />
      <PrimaryBorderTextField
        id="item-category"
        label="Category"
        placeholder="Item category"
        value={itemCategory}
        onChange={(e) => setItemCategory(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddItem}>
        Add Item
      </Button>
      {/* {notification && <div>{notification}</div>} */}

      {currentUser[currentMonthSelected].length > 0 &&
        currentUser[currentMonthSelected].map((item) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <li>
              {item.itemName} -- {item.itemPrice} -- {item.date} -- {item.category}
            </li>
          );
        })}
    </Box>
  );
};

export default MemberContent;
