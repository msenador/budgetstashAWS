import { createContext, useState } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  const logoutUser = () => {
    setCurrentUser([]);
  };

  return (
    <UserContext.Provider value={{ setCurrentUser, currentUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
