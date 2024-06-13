import React, { createContext, useContext, useState } from 'react';

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState('https://signup-backend-ashen.vercel.app/');

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => {
  return useContext(UrlContext);
};
