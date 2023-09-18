import React, { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const apiUrl = "http://localhost:8000";

  return <ApiContext.Provider value={apiUrl}>{children}</ApiContext.Provider>;
};

export const useApiUrl=()=> useContext(ApiContext)
