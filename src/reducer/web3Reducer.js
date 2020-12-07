import { ethers } from "ethers";

// web3 reducer
export const web3Reducer = (state, action) => {
  switch (action.type) {
    case "SET_isWeb3":
      return { ...state, isWeb3: action.isWeb3 };
    case "SET_isMetaMask":
      return { ...state, isMetaMask: action.isMetaMask };
    case "SET_isLogged":
      return { ...state, isLogged: action.isLogged };
    case "SET_account":
      return { ...state, account: action.account };
    case "SET_provider":
      return { ...state, provider: action.provider };
    case "SET_signer":
      return { ...state, signer: action.signer };
    case "SET_balance":
      return { ...state, balance: action.balance };
    case "SET_chainId":
      return { ...state, chainId: action.chainId };
    case "SET_networkName":
      return { ...state, networkName: action.networkName };
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`);
  }
};

// web3 initial state
export const web3InitialState = {
  isWeb3: false,
  isLogged: false,
  isMetaMask: false,
  account: ethers.constants.AddressZero,
  balance: 0,
  chainId: 0,
  networkName: "unknown",
  signer: null,
  provider: null,
};
