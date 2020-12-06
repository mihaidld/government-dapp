import React, { useContext, useEffect } from "react";
import Owner from "./layouts/Owner";
import Company from "./layouts/Company";
import Hospital from "./layouts/Hospital";
import Citizen from "./layouts/Citizen";
import Public from "./layouts/Public";
import { Web3Context } from "./context/Web3Context";
import { ContractsContext } from "./context/ContractsContext";
import { DappContext } from "./context/DappContext";
import ModeSwitch from "./components/ModeSwitch";
import { ModeContext } from "./context/ModeContext";
import Web3Info from "./components/Web3Info";
import Footer from "./components/Footer";
import BecomeCitizen from "./components/BecomeCitizen";
//import "../src/app.css";
import {} from "@chakra-ui/core";
import { ethers } from "ethers";

// TODO: add if, ternary or enum cases: not citizen, also admin etc. from https://www.robinwieruch.de/conditional-rendering-react

function App() {
  const { web3State, login } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { dappState, dappDispatch, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeClass = mode === "dark" ? "bg-dark text-white" : "";
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  useEffect(() => {
    (async function fetchAddressInfo() {
      try {
        const fetchedCitizen = await government.getCitizen(web3State.account);
        dappDispatch({
          type: "SET_isCitizen",
          isCitizen: fetchedCitizen.isAlive,
        });

        setCitizen({
          isAlive: fetchedCitizen.isAlive ? "alive" : "not alive",
          employer:
            fetchedCitizen.employer !== ethers.constants.AddressZero
              ? fetchedCitizen.employer.toString()
              : "no employer registered",
          isWorking: fetchedCitizen.isWorking ? "is working" : "unemployed",
          isSick: fetchedCitizen.isSick ? "is sick" : "healthy",
          retirementDate: new Date(fetchedCitizen.retirementDate * 1000),
          currentTokens: ethers.utils.formatEther(fetchedCitizen.currentTokens),
          healthTokens: ethers.utils.formatEther(fetchedCitizen.healthTokens),
          unemploymentTokens: ethers.utils.formatEther(
            fetchedCitizen.unemploymentTokens
          ),
          retirementTokens: ethers.utils.formatEther(
            fetchedCitizen.retirementTokens
          ),
        });

        const isCompany = await government.checkCompany(web3State.account);
        dappDispatch({ type: "SET_isCompany", isCompany });
        const isHospital = await government.checkHospital(web3State.account);
        dappDispatch({ type: "SET_isHospital", isHospital });
        const owner = await government.sovereign();
        dappDispatch({
          type: "SET_isOwner",
          isOwner: owner.toLowerCase() === web3State.account,
        });
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, [government, web3State.account, dappDispatch, setCitizen]);
  console.log("dappState.isCitizen", dappState.isCitizen);
  if (!web3State.is_web3) {
    return <p>Please install MetaMask https://metamask.io/</p>;
  }
  return (
    <div className={`min-vh-100 py-3 ${modeClass}`}>
      <div className="container my-4">
        <header className="d-flex justify-content-between flex-wrap align-items-center mb-4">
          <h1 className="display-4 mb-3">Citizen dApp</h1>
          <ModeSwitch />
        </header>
        <div className="row">
          <div className="col-sm-8">
            {!web3State.is_logged && (
              <>
                <button
                  type="submit"
                  className={modeButtonClass}
                  onClick={login}
                >
                  login
                </button>
              </>
            )}
            {web3State.chain_id !== 4 && (
              <p className="mb-5">
                Please connect to network Rinkeby to interact with Citizen
                contracts
              </p>
            )}
            {government !== null && web3State.chain_id === 4 && (
              <>
                <Public />
                {!dappState.isCitizen && <BecomeCitizen />}
                {dappState.isOwner && <Owner />}
                {dappState.isCompany && <Company />}
                {dappState.isHospital && <Hospital />}
                {dappState.isCitizen && <Citizen />}
              </>
            )}
          </div>
          <div className="col-sm-4 sidebar">
            <Web3Info />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
