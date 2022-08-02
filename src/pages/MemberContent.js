import { Box } from '@mui/system';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const MemberContent = () => {
  const { currentUser } = useContext(UserContext);

  const getMonthlyTotal = () => {
    const date = new Date();
    const month = date.getMonth();
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

  return (
    <Box>
      <h1>Welcome {currentUser.username}!</h1>
      <h3>monthly budget: </h3>
      <h3>Total spent this month: {getMonthlyTotal()}</h3>
    </Box>
  );
};

export default MemberContent;
