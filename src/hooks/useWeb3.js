import { useCallback, useEffect, useReducer } from "react";
import { ethers } from "ethers";
import {
  isWeb3,
  isMetaMask,
  getAccounts,
  loginToMetaMask,
  chainIdtoName,
} from "./web3-utils";
import { web3Reducer, web3InitialState } from "../reducer/web3Reducer";

// Web3 hook for web3State and login function
export const useWeb3 = (endpoint) => {
  const [web3State, web3Dispatch] = useReducer(web3Reducer, web3InitialState);

  // Login in to MetaMask manually (if user decides to do it)
  const login = useCallback(async () => {
    try {
      if (web3State.isWeb3 && !web3State.isLogged) {
        const accounts = await loginToMetaMask();
        web3Dispatch({ type: "SET_account", account: accounts[0] });
        web3Dispatch({ type: "SET_isLogged", isLogged: true });
      }
    } catch (e) {
      // user rejects the login attempt to MetaMask
      web3Dispatch({ type: "SET_account", account: web3InitialState.account });
      web3Dispatch({ type: "SET_isLogged", isLogged: false });
    }
  }, [web3State.isWeb3, web3State.isLogged]);

  // Check if web3 is injected by calling isWeb3
  useEffect(() => {
    web3Dispatch({ type: "SET_isWeb3", isWeb3: isWeb3() });
  }, []);

  // Listen for networks change events emitted by MetaMask provider (when currently connected chain changes)
  useEffect(() => {
    if (web3State.isWeb3) {
      const onChainChanged = async (chainId) => {
        const _chainId = parseInt(Number(chainId), 10);
        const _networkName = chainIdtoName(_chainId);
        web3Dispatch({
          type: "SET_chainId",
          chainId: _chainId,
        });
        web3Dispatch({
          type: "SET_networkName",
          networkName: _networkName,
        });
        window.location.reload();
      };
      window.ethereum.on("chainChanged", onChainChanged);
      return () => window.ethereum.off("chainChanged", onChainChanged);
    }
  }, [web3State.isWeb3]);

  // Check if metamask is installed by calling isMetaMask
  useEffect(() => {
    if (web3State.isWeb3) {
      web3Dispatch({ type: "SET_isMetaMask", isMetaMask: isMetaMask() });
    }
  }, [web3State.isWeb3]);

  // Check if logged in to metamask and get account, then listen for address change event (changing account or locking MetaMask)
  useEffect(() => {
    if (web3State.isWeb3) {
      const onAccountsChanged = async (accounts) => {
        try {
          const accounts = await getAccounts();
          if (accounts.length === 0) {
            // If not logged
            web3Dispatch({ type: "SET_isLogged", isLogged: false });
            web3Dispatch({
              type: "SET_account",
              account: web3InitialState.account,
            });
          } else {
            // Already logged
            web3Dispatch({ type: "SET_account", account: accounts[0] });
            web3Dispatch({ type: "SET_isLogged", isLogged: true });
          }
        } catch (e) {
          throw e;
        }
      };
      onAccountsChanged();
      window.ethereum.on("accountsChanged", onAccountsChanged);
      return () => window.ethereum.off("accountsChanged", onAccountsChanged);
    }
  }, [web3State.isWeb3]);

  // Connect to provider and signer
  useEffect(() => {
    if (web3State.account !== web3InitialState.account) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      web3Dispatch({ type: "SET_provider", provider: provider });
      const signer = provider.getSigner();
      web3Dispatch({ type: "SET_signer", signer: signer });
    } else {
      web3Dispatch({
        type: "SET_provider",
        provider: web3InitialState.provider,
      });
      web3Dispatch({ type: "SET_signer", signer: web3InitialState.signer });
    }
  }, [web3State.account, web3State.chainId]);

  // Get ETH account balance
  useEffect(() => {
    (async () => {
      if (
        web3State.provider &&
        web3State.account !== web3InitialState.account
      ) {
        const _balance = await web3State.provider.getBalance(web3State.account);
        const balance = ethers.utils.formatEther(_balance);
        web3Dispatch({ type: "SET_balance", balance: balance });
      } else {
        web3Dispatch({
          type: "SET_balance",
          balance: web3InitialState.balance,
        });
      }
    })();
  }, [web3State.provider, web3State.account]);

  // Listen for events emitted when a new block is mined to update balance of connected account
  useEffect(() => {
    if (web3State.provider) {
      const updateBalance = async (_blockNumber) => {
        const _balance = await web3State.provider.getBalance(web3State.account);
        const balance = ethers.utils.formatEther(_balance);
        if (web3State.account !== web3InitialState.account) {
          web3Dispatch({ type: "SET_balance", balance: balance });
        } else {
          web3Dispatch({
            type: "SET_balance",
            balance: web3InitialState.balance,
          });
        }
      };

      web3State.provider.on("block", updateBalance);

      return () => web3State.provider.off("block", updateBalance);
    }
  }, [web3State.provider, web3State.account]);

  // GET netword name and chainId from object network
  useEffect(() => {
    (async () => {
      if (web3State.provider) {
        const network = await web3State.provider.getNetwork();
        web3Dispatch({ type: "SET_chainId", chainId: network.chainId });
        web3Dispatch({
          type: "SET_networkName",
          networkName: chainIdtoName(network.chainId),
        });
      }
    })();
  }, [web3State.provider]);

  return { web3State, login };
};
