import styled from 'styled-components';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState, useMemo } from 'react';
import UserContext from '../context/UserContext';
import { Button, TextField } from '@mui/material';
import { Line } from 'rc-progress';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import { MAIN_BLUE } from '../theme';
import { forbiddenWords } from '../forbiddenWords';
import { getEnvironment } from '../globalHelpers.js/getEnvironment';

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
    }
  };

  const handleForbiddenWords = () => {
    if (currentUser.email === 'demo@budgetstash.com') {
      let itemNameLowerCase = itemName.replace(/\s/g, '').toLowerCase();
      let itemCategoryLowerCase = itemCategory.replace(/\s/g, '').toLowerCase();
      if (
        forbiddenWords.includes(itemNameLowerCase) ||
        forbiddenWords.includes(itemCategoryLowerCase)
      ) {
        return true;
      }
    }
  };

  const handleLimitInputChars = () => {
    let splitItemNameInput = itemName.split('');
    let splitItemCategoryInput = itemCategory.split('');

    if (splitItemNameInput.length > 15 || splitItemCategoryInput.length > 15) {
      return true;
    }
  };

  const handleAddItem = async () => {
    setSpinnerModal(true);

    if (handleForbiddenWords() === true) {
      setNotification('Item Name/Category includes profanity - Not allowed in demo account.');
      setSpinnerModal(false);
      return;
    }

    if (handleLimitInputChars()) {
      setNotification('Item Name/Category max of 15 characters');
      setSpinnerModal(false);
      return;
    }

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
        // eslint-disable-next-line no-undef
        getEnvironment(process.env.REACT_APP_API_ADD_ITEM, REACT_APP_API_ADD_ITEM),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line no-undef
            'x-api-key': getEnvironment(process.env.REACT_APP_KEY_ADD_ITEM, REACT_APP_KEY_ADD_ITEM)
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

  const handleDeleteItem = async (email, monthSelected, index) => {
    setSpinnerModal(true);
    const requestBody = {
      email: email,
      monthSelected: monthSelected,
      index: index
    };

    try {
      const res = await fetch(
        // eslint-disable-next-line no-undef
        getEnvironment(process.env.REACT_APP_API_DELETE_ITEM, REACT_APP_API_DELETE_ITEM),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': getEnvironment(
              // eslint-disable-next-line no-undef
              process.env.REACT_APP_KEY_DELETE_ITEM,
              REACT_APP_KEY_DELETE_ITEM
            )
          },
          body: JSON.stringify(requestBody)
        }
      );

      switch (res.status) {
        case 200:
          setNotification('Item Deleted');
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

          <Box style={{ fontWeight: '900', display: 'flex', justifyContent: 'space-between' }}>
            <Box>Category</Box>
            <Box>%</Box>
            <Box>Dollar Amount</Box>
          </Box>

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
        </Box>

        <Box>
          <hr width="1" size="600" />
        </Box>

        <Box style={{ width: '1000px' }}>
          <Box fontStyle="italic" marginTop={2} fontWeight="700" style={{ textAlign: 'center' }}>
            Enter New Item
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
            <PrimaryBorderTextField
              id="item-category"
              label="Category"
              placeholder="Shopping"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
            />
            <PrimaryBorderTextField
              id="item-name"
              label="Name"
              placeholder="Shirt"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
            />
            <PrimaryBorderTextField
              id="item-price"
              label="Price"
              placeholder="2.99"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              onKeyDown={handlePressEnterAddItem}
              type="number"
            />
          </Box>

          <Box style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              style={{ width: '30%' }}>
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
              height: '370px',
              overflowY: 'auto',
              overflowX: 'auto',
              border: '2px inset'
            }}>
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
