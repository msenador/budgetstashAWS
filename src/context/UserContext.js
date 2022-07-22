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
              items: [
                {
                  name: 'shirt',
                  price: '10.99'
                },
                {
                  name: 'bag',
                  price: '212.99'
                }
              ]
            }
          ]
        },
        {
          bills: [
            {
              totalSpent: '330.00'
            },
            {
              items: [
                {
                  name: 'mortgage',
                  price: '100.99'
                },
                {
                  name: 'car',
                  price: '22.99'
                }
              ]
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
