import React, { useContext, useState, useEffect } from "react";
import { Web3Context } from "../context/Web3Context";
import { ModeContext } from "../context/ModeContext";
import { DappContext } from "../context/DappContext";
import { ContractsContext } from "../context/ContractsContext";
import { ethers } from "ethers";
import { IconContext } from "react-icons";
import { FaHospital, FaChessKing, FaBuilding, FaVoteYea } from "react-icons/fa";

function CitInfo() {
  // consume context
  const { web3State } = useContext(Web3Context);
  const { dappState, citizen } = useContext(DappContext);
  const { token } = useContext(ContractsContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeClass =
    mode === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  //define state variables to set balance or display status
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [balance, setBalance] = useState("0");

  // define event handler to set state
  const handleClickGetDetails = async () => {
    try {
      const res = await token.balanceOf(web3State.account);
      setBalance(ethers.utils.formatEther(res));
      setIsDisplayed(isDisplayed ? false : true);
    } catch (e) {
      console.log(e.message);
    }
  };

  // listen for address change event (changing account) to hide previous balance result
  useEffect(() => {
    const onAccountsChanged = async (accounts) => {
      try {
        setIsDisplayed(false);
      } catch (e) {
        throw e;
      }
    };
    onAccountsChanged();
    window.ethereum.on("accountsChanged", onAccountsChanged);
    return () => window.ethereum.off("accountsChanged", onAccountsChanged);
  }, []);

  /* with conditional rendering depending on the account display its role,
  corresponding react icon and details (CTZ balance and, if citizen, citizen
  properties)*/
  return (
    <>
      <div className={`card shadow-sm mb-2 ${modeClass}`}>
        <div className="card-body">
          <h3 className="h4 text-primary mb-3">
            <span className="badge bg-primary">CTZ information</span>
          </h3>
          {dappState.isOwner && (
            <div className="mb-3 d-flex aling-items-center justify-content-between">
              <p className="fw-bold">The SOVEREIGN</p>
              <IconContext.Provider
                value={{ className: "text-danger", size: "2em" }}
              >
                <div>
                  <FaChessKing />
                </div>
              </IconContext.Provider>
            </div>
          )}
          {dappState.isCompany && (
            <div className="mb-3 d-flex aling-items-center justify-content-between">
              <p className="fw-bold">Registered COMPANY</p>
              <IconContext.Provider
                value={{ className: "text-danger", size: "2em" }}
              >
                <div>
                  <FaBuilding />
                </div>
              </IconContext.Provider>
            </div>
          )}
          {dappState.isHospital && (
            <div className="mb-3 d-flex aling-items-center justify-content-between">
              <p className="fw-bold">Registered HOSPITAL</p>
              <IconContext.Provider
                value={{ className: "text-danger", size: "2em" }}
              >
                <div>
                  <FaHospital />
                </div>
              </IconContext.Provider>
            </div>
          )}
          {citizen.isAlive === "alive" && (
            <div className="mb-3 d-flex aling-items-center justify-content-between">
              <p className="fw-bold">A CITIZEN</p>
              <IconContext.Provider
                value={{ className: "text-danger", size: "2em" }}
              >
                <div>
                  <FaVoteYea />
                </div>
              </IconContext.Provider>
            </div>
          )}
          <section className="mb-3">
            <button
              id="buttonInfo"
              type="submit"
              className={`mb-3 ${modeButtonClass}`}
              onClick={handleClickGetDetails}
            >
              My Details
            </button>
            {isDisplayed && (
              <dl>
                <dt>Balance of CTZ tokens : </dt>
                <dd>{balance}</dd>
              </dl>
            )}
            {isDisplayed && citizen.isAlive === "alive" && (
              <dl>
                <dt>Life Status : </dt>
                <dd>{citizen.isAlive}</dd>
                <dt>Employer : </dt>
                <dd>{citizen.employer}</dd>
                <dt>Working Status : </dt>
                <dd>{citizen.isWorking}</dd>
                <dt>Health Status : </dt>
                <dd>{citizen.isSick}</dd>
                <dt>Date of Retirement : </dt>
                <dd>{citizen.retirementDate.toUTCString()}</dd>
                <dt>Current Account Tokens : </dt>
                <dd>{citizen.currentTokens}</dd>
                <dt>Health Insurance Tokens : </dt>
                <dd>{citizen.healthTokens}</dd>
                <dt>Unemployment Tokens : </dt>
                <dd>{citizen.unemploymentTokens}</dd>
                <dt>Retirement Tokens : </dt>
                <dd>{citizen.retirementTokens}</dd>
              </dl>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default CitInfo;
