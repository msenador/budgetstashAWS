import styled from 'styled-components';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import UserContext from '../context/UserContext';
import { Button, TextField } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Line } from 'rc-progress';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import { MAIN_BLUE } from '../theme';
// import { Line } from 'rc-progress';

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

const MemberContent = () => {
  let dataForProgressBars = [];

  const [currentMonthSelected, setCurrentMonthSelected] = useState(convertMonth(month));
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [notification, setNotification] = useState('');

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { spinnerModal, setSpinnerModal } = useContext(SpinnerModalContext);

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

  const handlePressEnterAddItem = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
      setSpinnerModal(false);
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
          setNotification('Item Added');
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

  const progressBarsData = (currentUser, currentMonthSelected) => {
    // let data = {};
    // let categories = [];
    // let percentage = [];
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

  useMemo(() => {
    progressBarsData(currentUser, currentMonthSelected);
  }, [dataForProgressBars]);

  useEffect(() => {
    // console.log(currentUser);
    // console.log(currentMonthSelected);
    setNotification('');
  }, [currentMonthSelected]);

  return (
    <Box padding={'100px'}>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Button
          onClick={() => setCurrentMonthSelected('January')}
          color="primary"
          variant={currentMonthSelected === 'January' ? 'contained' : 'outlined'}>
          Jan
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('February')}
          color="primary"
          variant={currentMonthSelected === 'February' ? 'contained' : 'outlined'}>
          Feb
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('March')}
          color="primary"
          variant={currentMonthSelected === 'March' ? 'contained' : 'outlined'}>
          Mar
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('April')}
          color="primary"
          variant={currentMonthSelected === 'April' ? 'contained' : 'outlined'}>
          Apr
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
          Aug
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('September')}
          color="primary"
          variant={currentMonthSelected === 'September' ? 'contained' : 'outlined'}>
          Sept
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('October')}
          color="primary"
          variant={currentMonthSelected === 'October' ? 'contained' : 'outlined'}>
          Oct
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('November')}
          color="primary"
          variant={currentMonthSelected === 'November' ? 'contained' : 'outlined'}>
          Nov
        </Button>
        <Button
          onClick={() => setCurrentMonthSelected('December')}
          color="primary"
          variant={currentMonthSelected === 'December' ? 'contained' : 'outlined'}>
          Dec
        </Button>
      </Box>

      <hr style={{ marginTop: '20px' }} />

      <h1 style={{ display: 'flex', justifyContent: 'center', fontSize: '50px' }}>
        {currentMonthSelected} Summary
      </h1>

      <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <h1 style={{ textAlign: 'center ' }}>
            TOTAL SPENT: ${parseFloat(getMonthlyTotal()).toFixed(2)}
          </h1>

          <hr style={{ marginTop: '20px' }} />

          {dataForProgressBars.length > 0 ? (
            <Box
              style={{
                border: 'inset',
                padding: '20px',
                width: '450px',
                height: '465px',
                overflowY: 'auto',
                overflowX: 'auto'
              }}>
              {dataForProgressBars &&
                dataForProgressBars
                  .sort((a, b) => b.total - a.total)
                  .map((item) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Box>
                        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box style={{ fontWeight: '900' }}>{item.category.toUpperCase()}</Box>
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
        </Box>

        <Box>
          <hr width="1" size="600" />
        </Box>

        <Box style={{ width: '1000px' }}>
          <Box style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <Button variant="contained" color="primary" onClick={handleAddItem}>
              <PostAddIcon />
            </Button>
            <PrimaryBorderTextField
              id="item-name"
              label="Item name"
              placeholder="Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
            />

            <PrimaryBorderTextField
              id="item-price"
              label="Item price"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
              type="number"
            />

            <PrimaryBorderTextField
              id="item-category"
              label="Item category"
              placeholder="Category"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
            />
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

          <Box style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900' }}>
            <Box>Count ({currentUser[currentMonthSelected].length})</Box>
            <Box>Item</Box>
            <Box>Price</Box>
            <Box>Date</Box>
            <Box>Category</Box>
          </Box>

          <hr />

          <Box
            style={{
              height: '465px',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '2px inset'
            }}>
            {currentUser[currentMonthSelected].length > 0 ? (
              currentUser[currentMonthSelected].map((item, index) => {
                return (
                  <Box
                    key={`${item.itemName} - ${item.date}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      backgroundColor: index % 2 === 0 ? 'aliceblue' : ''
                    }}>
                    {/* <Box>{index.toString().split('').length === 1 ? `0${index +}` : `${index}`}</Box> */}
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
                      <Box>{item.itemName}</Box>
                    </Box>

                    <Box style={{ width: '100px' }}>${item.itemPrice}</Box>

                    <Box style={{ width: '100px' }}>{item.date}</Box>

                    <Box style={{ width: '100px' }}>{item.category}</Box>
                  </Box>
                );
              })
            ) : (
              <h1 style={{ textAlign: 'center' }}>No Items</h1>
            )}
          </Box>
        </Box>
      </Box>
      <Modal ariaHideApp={false} isOpen={spinnerModal} style={spinnerCustomStyles}>
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default MemberContent;
