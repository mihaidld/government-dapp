import { ethers } from "ethers";

// citizen reducer
export const citizenReducer = (state, action) => {
  switch (action.type) {
    case "SET_isAlive":
      return { ...state, isAlive: action.isAlive };
    case "SET_employer":
      return { ...state, employer: action.employer };
    case "SET_isWorking":
      return { ...state, isWorking: action.isWorking };
    case "SET_isSick":
      return { ...state, isSick: action.isSick };
    case "SET_retirementDate":
      return { ...state, retirementDate: action.retirementDate };
    case "SET_currentTokens":
      return { ...state, currentTokens: action.currentTokens };
    case "SET_healthTokens":
      return { ...state, healthTokens: action.healthTokens };
    case "SET_unemploymentTokens":
      return { ...state, unemploymentTokens: action.unemploymentTokens };
    case "SET_retirementTokens":
      return { ...state, retirementTokens: action.retirementTokens };
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`);
  }
};

// citizen initial state
export const citizenInitialState = {
  isAlive: false,
  employer: ethers.constants.AddressZero,
  isWorking: false,
  isSick: false,
  retirementDate: "",
  currentTokens: 0,
  healthTokens: 0,
  unemploymentTokens: 0,
  retirementTokens: 0,
};
