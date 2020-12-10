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
  const { dappState, dappDispatch, citizen, setCitizen } = useContext(
    DappContext
  );
  const { mode } = useContext(ModeContext);
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";
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
  if (!web3State.isWeb3) {
    return <p>Please install MetaMask https://metamask.io/</p>;
  }
  return (
    <div className={`min-vh-100 py-3 ${modeClass}`}>
      <div className="container">
        <header className="d-flex justify-content-between flex-wrap align-items-center mb-4">
          <h1 className="display-4 fw-bold mb-3">Citizen DApp</h1>
          <ModeSwitch />
        </header>
        <div className="row mb-5">
          <div className="col-lg-8">
            {!web3State.isLogged && (
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
            {web3State.chainId !== 4 && (
              <p className="mb-5">
                Please connect to network Rinkeby to interact with Citizen
                contracts
              </p>
            )}
            {government !== null && web3State.chainId === 4 && (
              <>
                {dappState.isOwner && (
                  <p className="mb-3 fst-italic lead text-center bg-info">
                    You are the sovereign of this country
                  </p>
                )}
                {dappState.isCompany && (
                  <p className="mb-3 fst-italic lead text-center bg-info">
                    You are a registered company
                  </p>
                )}
                {dappState.isHospital && (
                  <p className="mb-3 fst-italic lead text-center bg-info">
                    You are a registered hospital
                  </p>
                )}
                {citizen.isAlive === "alive" && (
                  <>
                    <p className="mb-2 fst-italic lead text-center bg-info">
                      You are a citizen
                    </p>
                    {/* <dl className="row mb-3">
                      <dt className="col-sm-6">Life status : </dt>
                      <dd className="col-sm-6">{citizen.isAlive}</dd>
                      <dt className="col-sm-6">Employer : </dt>
                      <dd className="col-sm-6">{citizen.employer}</dd>
                      <dt className="col-sm-6">Working status : </dt>
                      <dd className="col-sm-6">{citizen.isWorking}</dd>
                      <dt className="col-sm-6">Health Status : </dt>
                      <dd className="col-sm-6">{citizen.isSick}</dd>
                      <dt className="col-sm-6">Date of retirement : </dt>
                      <dd className="col-sm-6">
                        {citizen.retirementDate.toUTCString()}
                      </dd>
                      <dt className="col-sm-6">
                        Nb tokens in current account :{" "}
                      </dt>
                      <dd className="col-sm-6">{citizen.currentTokens}</dd>
                      <dt className="col-sm-6">Health Insurance Tokens : </dt>
                      <dd className="col-sm-6">{citizen.healthTokens}</dd>
                      <dt className="col-sm-6">Unemployment Tokens : </dt>
                      <dd className="col-sm-6">{citizen.unemploymentTokens}</dd>
                      <dt className="col-sm-6">Retirement Tokens : </dt>
                      <dd className="col-sm-6">{citizen.retirementTokens}</dd>
                    </dl> */}
                  </>
                )}
                <Public />
                {!dappState.isCitizen &&
                  !dappState.isOwner &&
                  !dappState.isCompany &&
                  !dappState.isHospital && <BecomeCitizen />}
                {dappState.isOwner && <Owner />}
                {dappState.isCompany && <Company />}
                {dappState.isHospital && <Hospital />}
                {dappState.isCitizen && <Citizen />}
              </>
            )}
          </div>
          <div className="col-lg-4 sidebar">
            <div className="sticky-top">
              <Web3Info />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
