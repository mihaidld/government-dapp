import React, { useContext, useEffect } from "react";
//import "../src/app.css";
import {} from "@chakra-ui/core";
import { ethers } from "ethers";
import { Web3Context } from "./context/Web3Context";
import { ContractsContext } from "./context/ContractsContext";
import { DappContext } from "./context/DappContext";
import ModeSwitch from "./components/ModeSwitch";
import { ModeContext } from "./context/ModeContext";
import Owner from "./layouts/Owner";
import Company from "./layouts/Company";
import Hospital from "./layouts/Hospital";
import Citizen from "./layouts/Citizen";
import Public from "./layouts/Public";
import Rules from "./layouts/Rules";
import BecomeCitizen from "./components/BecomeCitizen";
import Web3Info from "./components/Web3Info";
import CitInfo from "./components/CitInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";

// TODO: add if, ternary or enum cases: not citizen, also admin etc. from https://www.robinwieruch.de/conditional-rendering-react

function App() {
  const { web3State, login } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { dappState, dappDispatch, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const modeNavbarClass =
    mode === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";

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
    <>
      <Header />
      <nav
        className={`navbar navbar-expand-md sticky-top ${modeNavbarClass}`}
        id="mainnav"
      >
        <div className="container">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="navbar-brand fw-bold" href="#">
            Citizen DApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#public">
                  Public Information
                </a>
              </li>
              {!dappState.isCitizen &&
                !dappState.isOwner &&
                !dappState.isCompany &&
                !dappState.isHospital && (
                  <li className="nav-item">
                    <a className="nav-link" href="#become">
                      Become Citizen
                    </a>
                  </li>
                )}
              {dappState.isOwner && (
                <li className="nav-item">
                  <a className="nav-link" href="#owner">
                    Sovereign Functions
                  </a>
                </li>
              )}
              {dappState.isCompany && (
                <li className="nav-item">
                  <a className="nav-link" href="#company">
                    Business Management
                  </a>
                </li>
              )}
              {dappState.isHospital && (
                <li className="nav-item">
                  <a className="nav-link" href="#hospital">
                    Healthcare Management
                  </a>
                </li>
              )}
              {dappState.isCitizen && (
                <li className="nav-item">
                  <a className="nav-link" href="#citizenship">
                    Citizenship
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#rules">
                  Rules
                </a>
              </li>
              <li className="nav-item pt-2">
                <ModeSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`min-vh-100 ${modeClass}`}>
        <main className="container">
          <div className="row mb-3">
            <div className="col-lg-8">
              {!web3State.isLogged && (
                <button
                  type="submit"
                  className={`${modeButtonClass} mb-3`}
                  onClick={login}
                >
                  login
                </button>
              )}
              {web3State.chainId !== 4 && (
                <p className="mb-5">
                  Please connect to network Rinkeby to interact with Citizen
                  contracts
                </p>
              )}
              {government !== null && web3State.chainId === 4 && (
                <>
                  <Public />
                  {!dappState.isCitizen &&
                    !dappState.isOwner &&
                    !dappState.isCompany &&
                    !dappState.isHospital && <BecomeCitizen />}
                  {dappState.isOwner && <Owner />}
                  {dappState.isCompany && <Company />}
                  {dappState.isHospital && <Hospital />}
                  {dappState.isCitizen && <Citizen />}
                  <Rules />
                </>
              )}
            </div>
            <div className="col-lg-4 sidebar">
              <div className="sticky-top">
                <Web3Info />
                {government !== null && web3State.chainId === 4 && <CitInfo />}
              </div>
            </div>
          </div>
          <p className="pb-3 small">
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              {" "}
              www.flaticon.com
            </a>
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
