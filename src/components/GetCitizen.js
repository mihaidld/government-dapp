import React, { useContext, useState } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { ethers } from "ethers";

/* TODO: consider using useReducer and context for contracts */

function GetCitizen() {
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const { government } = useContext(ContractsContext);
  const [getCitizen, setGetCitizen] = useState({
    isAlive: false,
    employer: ethers.constants.AddressZero,
    isWorking: false,
    isSick: false,
    retirementDate: 0,
    currentTokens: 0,
    healthTokens: 0,
    unemploymentTokens: 0,
    retirementTokens: 0,
  });

  const handleSubmitGetCitizen = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const res = await government.getCitizen(address);
      console.log(res.currentTokens);
      console.log(res.currentTokens / (10 ^ 18));
      console.log(ethers.utils.formatEther(res.currentTokens));
      setGetCitizen({
        isAlive: res.isAlive ? "alive" : "not alive",
        employer:
          res.employer !== ethers.constants.AddressZero
            ? res.employer.toString()
            : "no employer registered",
        isWorking: res.isWorking ? "is working" : "unemployed",
        isSick: res.isSick ? "is sick" : "healthy",
        retirementDate: new Date(res.retirementDate * 1000).toUTCString(),
        currentTokens: ethers.utils.formatEther(res.currentTokens),
        healthTokens: ethers.utils.formatEther(res.healthTokens),
        unemploymentTokens: ethers.utils.formatEther(res.unemploymentTokens),
        retirementTokens: ethers.utils.formatEther(res.retirementTokens),
      });
    } catch {
      console.log(event.message);
    }
  };

  return (
    <>
      <h3 className="h2">Get the details of a citizen</h3>
      <form onSubmit={handleSubmitGetCitizen}>
        <div className="mb-3 ">
          <label className="form-label" htmlFor="addressCitizen">
            Enter an address
          </label>
          <input
            id="addressCitizen"
            name="addressCitizen"
            placeholder="address"
            aria-label="input Address to check citizen details"
            aria-describedby="buttonCitizen"
            className="form-control"
          />
        </div>
        <button id="buttonCitizen" type="submit" className={modeButtonClass}>
          Get citizen details
        </button>
      </form>
      {getCitizen.isAlive === "alive" && (
        <>
          <p>Below are the details of this citizen</p>
          <dl className="row">
            <dt className="col-sm-3">Life status : </dt>
            <dd className="col-sm-9">{getCitizen.isAlive}</dd>
            <dt className="col-sm-3">Employer : </dt>
            <dd className="col-sm-9">{getCitizen.employer}</dd>
            <dt className="col-sm-3">Working status : </dt>
            <dd className="col-sm-9">{getCitizen.isWorking}</dd>
            <dt className="col-sm-3">Health Status : </dt>
            <dd className="col-sm-9">{getCitizen.isSick}</dd>
            <dt className="col-sm-3">Date of retirement : </dt>
            <dd className="col-sm-9">{getCitizen.retirementDate}</dd>
            <dt className="col-sm-3">Nb tokens in current account : </dt>
            <dd className="col-sm-9">{getCitizen.currentTokens}</dd>
            <dt className="col-sm-3">Health Insurance Tokens : </dt>
            <dd className="col-sm-9">{getCitizen.healthTokens}</dd>
            <dt className="col-sm-3">Unemployment Tokens : </dt>
            <dd className="col-sm-9">{getCitizen.unemploymentTokens}</dd>
            <dt className="col-sm-3">Retirement Tokens : </dt>
            <dd className="col-sm-9">{getCitizen.retirementTokens}</dd>
          </dl>
        </>
      )}
    </>
  );
}

export default GetCitizen;
