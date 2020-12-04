import { ethers } from "ethers";

// web3 reducer
export const web3Reducer = (state, action) => {
  switch (action.type) {
    case "SET_is_web3":
      return { ...state, is_web3: action.is_web3 };
    case "SET_is_metamask":
      return { ...state, is_metamask: action.is_metamask };
    case "SET_is_logged":
      return { ...state, is_logged: action.is_logged };
    case "SET_account":
      return { ...state, account: action.account };
    case "SET_provider":
      return { ...state, provider: action.provider };
    case "SET_signer":
      return { ...state, signer: action.signer };
    case "SET_balance":
      return { ...state, balance: action.balance };
    case "SET_chain_id":
      return { ...state, chain_id: action.chain_id };
    case "SET_network_name":
      return { ...state, network_name: action.network_name };
    default:
      throw new Error(`Unhandled action ${action.type} in web3Reducer`);
  }
};

// web3 initial state
export const web3InitialState = {
  is_web3: false,
  is_logged: false,
  is_metamask: false,
  account: ethers.constants.AddressZero,
  balance: 0,
  chain_id: 0,
  network_name: "unknown",
  signer: null,
  provider: null,
};
