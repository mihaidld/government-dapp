import React, { useReducer, useState, createContext } from "react";
import { dappReducer, initialDappState } from "../reducer/dappReducer";
import { ethers } from "ethers";

// Dapp context
export const DappContext = createContext();

// Dapp provider for managing roles of connected account and its citizen properties
export const DappProvider = ({ children }) => {
  const [dappState, dappDispatch] = useReducer(dappReducer, initialDappState);
  const [citizen, setCitizen] = useState({
    isAlive: false,
    employer: ethers.constants.AddressZero,
    isWorking: false,
    isSick: false,
    retirementDate: 0,
    currentTokens: 0,
    healthTokens: 0,
    unemploymentTokens: 0,
    retirementTokens: 0,
  });

  return (
    <DappContext.Provider
      value={{ dappState, dappDispatch, citizen, setCitizen }}
    >
      {children}
    </DappContext.Provider>
  );
};
