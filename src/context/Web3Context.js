import React, { createContext } from "react";
import { useWeb3 } from "../hooks/useWeb3";

// Web3 context
export const Web3Context = createContext(null);

// Web3 provider
export const Web3Provider = ({ children }) => {
  return (
    <>
      <Web3Context.Provider value={useWeb3()}>{children}</Web3Context.Provider>
    </>
  );
};
