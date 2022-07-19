import { createContext, useState } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const loginUser = () => {
    setCurrentUser({
      email: 'smorian@yahoo.com',
      username: 'morian',
      totalSpent: '212.45',
      Categories: [
        {
          shopping: [
            {
              totalSpent: '300.00'
            },
            {
              itemName: 'shirt',
              itemPrice: '10.99'
            },
            {
              itemName: 'bag',
              itemPrice: '212.99'
            }
          ]
        },
        {
          bills: [
            {
              totalSpent: '330.00'
            },
            {
              itemName: 'mortgage',
              itemPrice: '100.99'
            },
            {
              itemName: 'car',
              itemPrice: '22.99'
            }
          ]
        }
      ]
    });
  };

  return (
    <UserContext.Provider value={{ currentUser, logoutUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
