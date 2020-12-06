import React, { useReducer, useState, createContext } from "react";
import { dappReducer, initialDappState } from "../reducer/dappReducer";
import { ethers } from "ethers";

export const DappContext = createContext();

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
