import React, { createContext } from 'react';
import db from '../database'; // Import initialized database

export const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
  return (
    <DatabaseContext.Provider value={{ db }}>
      {children}
    </DatabaseContext.Provider>
  );
};
