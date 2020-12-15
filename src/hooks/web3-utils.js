// Utility Functions

// Check if web3 is injected
export const isWeb3 = () => {
  return typeof window.ethereum !== "undefined" ? true : false;
};

// Check if MetaMask is installed
export const isMetaMask = () => {
  return window.ethereum.isMetaMask ? true : false;
};

// Return account if connected
export const getAccounts = async () => {
  try {
    return await window.ethereum.request({
      method: "eth_accounts",
    });
  } catch (e) {
    throw e;
  }
};

// Login attempt, if success return array of one account
export const loginToMetaMask = async () => {
  try {
    return await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  } catch (e) {
    throw e;
  }
};

// Change network id to its name
export const chainIdtoName = (chainId) => {
  switch (chainId) {
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    case 42:
      return "Kovan";
    case 5:
      return "Goerli";
    default:
      return "unknown";
  }
};
