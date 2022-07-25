import { createContext, useState } from 'react';

const SpinnerModalContext = createContext();

// eslint-disable-next-line react/prop-types
export const SpinnerModalProvider = ({ children }) => {
  const [spinnerModal, setSpinnerModal] = useState(false);

  return (
    <SpinnerModalContext.Provider value={{ spinnerModal, setSpinnerModal }}>
      {children}
    </SpinnerModalContext.Provider>
  );
};

export default SpinnerModalContext;
