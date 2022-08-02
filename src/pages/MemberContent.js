import { Box } from '@mui/system';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const MemberContent = () => {
  const { currentUser } = useContext(UserContext);

  const date = new Date();
  const month = date.getMonth();

  const getMonthlyTotal = () => {
    let prices = [];
    switch (month) {
      case 1:
        prices = currentUser.January.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 2:
        prices = currentUser.February.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 3:
        prices = currentUser.March.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 4:
        prices = currentUser.April.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 5:
        prices = currentUser.May.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 6:
        prices = currentUser.June.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 7:
        prices = currentUser.July.map((item) => parseFloat(parseFloat(item.itemPrice).toFixed(2)));
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 8:
        prices = currentUser.August.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 9:
        prices = currentUser.September.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 10:
        prices = currentUser.October.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 11:
        prices = currentUser.November.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      case 12:
        prices = currentUser.December.map((item) =>
          parseFloat(parseFloat(item.itemPrice).toFixed(2))
        );
        return prices.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
    }
  };

  const convertMonth = (currentMonth) => {
    switch (currentMonth) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  };

  return (
    <Box padding={'100px'}>
      <h1>Welcome {currentUser.username}!</h1>
      <h1>{convertMonth(month)} Overview</h1>
      <h3>Total spent this month: {getMonthlyTotal()}</h3>

      {}
    </Box>
  );
};

export default MemberContent;
