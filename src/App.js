import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Context } from "./context/Web3Context";
import { ContractsContext } from "./context/ContractsContext";
import { DappContext } from "./context/DappContext";
import { ModeContext } from "./context/ModeContext";
import Owner from "./layouts/Owner";
import Company from "./layouts/Company";
import Hospital from "./layouts/Hospital";
import Citizen from "./layouts/Citizen";
import Public from "./layouts/Public";
import Rules from "./layouts/Rules";
import ModeSwitch from "./components/ModeSwitch";
import BecomeCitizen from "./components/BecomeCitizen";
import Web3Info from "./components/Web3Info";
import CitInfo from "./components/CitInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // consume context
  const { web3State, login } = useContext(Web3Context);
  const { token, government } = useContext(ContractsContext);
  const { dappState, dappDispatch, setCitizen } = useContext(DappContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const modeNavbarClass =
    mode === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light";

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // check role of the connected account (citizen, company etc.) and if citizen fetch its properties,
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

  // if web3 is not injected display message with link to MetaMask website
  if (!web3State.isWeb3) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <p className="text-danger h5">
          To interact with Citizen contracts please install MetaMask at :
          https://metamask.io/
        </p>
      </div>
    );
  }
  // if web3 injected
  return (
    <>
      <Header />
      {/* responsive navigation header with public contents and other contents with conditional rendering 
      depending on role of connected account
      e.g. Healthcare Management only for accounts registered as hospital*/}
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
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#public">
                  <span className="badge rounded-pill bg-primary">
                    Public Information
                  </span>
                </a>
              </li>
              {/* Become Citizen only for accounts without a role*/}
              {!dappState.isCitizen &&
                !dappState.isOwner &&
                !dappState.isCompany &&
                !dappState.isHospital && (
                  <li className="nav-item">
                    <a className="nav-link" href="#become">
                      <span className="badge rounded-pill bg-primary">
                        Become Citizen
                      </span>
                    </a>
                  </li>
                )}
              {dappState.isOwner && (
                <li className="nav-item">
                  <a className="nav-link" href="#owner">
                    <span className="badge rounded-pill bg-primary">
                      Sovereign Functions
                    </span>
                  </a>
                </li>
              )}
              {dappState.isCompany && (
                <li className="nav-item">
                  <a className="nav-link" href="#company">
                    <span className="badge rounded-pill bg-primary">
                      Business Management
                    </span>
                  </a>
                </li>
              )}
              {dappState.isHospital && (
                <li className="nav-item">
                  <a className="nav-link" href="#hospital">
                    <span className="badge rounded-pill bg-primary">
                      Healthcare Management
                    </span>
                  </a>
                </li>
              )}
              {dappState.isCitizen && (
                <li className="nav-item">
                  <a className="nav-link" href="#citizenship">
                    <span className="badge rounded-pill bg-primary">
                      Citizenship
                    </span>
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#rules">
                  <span className="badge rounded-pill bg-primary">Rules</span>
                </a>
              </li>
              {/* component handling switch between light and dark modes*/}
              <li className="nav-item pt-2">
                <ModeSwitch />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={`min-vh-100 ${modeClass}`}>
        <main className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* display login button to MetaMask button if not connected already*/}
              {!web3State.isLogged && (
                <button
                  type="submit"
                  className={`${modeButtonClass} mb-3`}
                  onClick={login}
                >
                  login
                </button>
              )}
              {/* display message to switch to Rinkeby testnet since contracts are deployed on this network*/}
              {web3State.chainId !== 4 && (
                <p className="mb-5">
                  Please connect to network Rinkeby to interact with Citizen
                  contracts
                </p>
              )}
              {/* display components from layouts folder if contracts are set and connected to Rinkeby, 
              public information and rules for everyone, the other layouts with conditional rendering*/}
              {token !== null &&
                government !== null &&
                web3State.chainId === 4 && (
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
            {/* display sidebar position sticky top on the right when width >=992px or below for lower width
            containing web3 information and Citizen related information on the account*/}
            <div className="col-lg-4 sidebar">
              <div className="sticky-top">
                <Web3Info />
                {token !== null &&
                  government !== null &&
                  web3State.chainId === 4 && <CitInfo />}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
