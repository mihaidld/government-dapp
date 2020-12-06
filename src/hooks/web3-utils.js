export const isWeb3 = () => {
  return typeof window.ethereum !== "undefined" ? true : false;
};

export const isMetaMask = () => {
  return window.ethereum.isMetaMask ? true : false;
};

// return account if connected
export const getAccounts = async () => {
  try {
    return await window.ethereum.request({
      method: "eth_accounts",
    });
  } catch (e) {
    throw e;
  }
};

// login attempt, if success return array of account
export const loginToMetaMask = async () => {
  try {
    return await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  } catch (e) {
    throw e;
  }
};

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

// send `transaction`, in ethers, from signer address, with as parameter a transaction object (with 2 properties "to" and "value")
export const sendEtherTransaction = async (signer, provider, transaction) => {
  try {
    // send the transaction and return a transaction response
    const tx = await signer.sendTransaction(transaction);
    // wait for tx.hash to be mined with 3 block validation and a timeout of 120 seconds
    // if succeed returns a receipt of the transaction
    const receipt = await provider.waitForTransaction(tx.hash, 3, 120000);
    return receipt;
  } catch (e) {
    console.log("error sendEtherTransaction :", e);
    return null;
  }
};
