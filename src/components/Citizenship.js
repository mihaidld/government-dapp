import React, { useContext, useState } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ethers } from "ethers";

/* TODO: consider using useReducer and context for contracts */

function Citizenship() {
  const { government, token } = useContext(ContractsContext);
  const [inputAddress, setInputAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [citizen, setCitizen] = useState({
    isAlive: false,
    employer: ethers.constants.AddressZero,
    isWorking: false,
    isSick: false,
    nbVotes: 0,
    termAdmin: 0,
    retirementDate: 0,
    termBanned: 0,
    nbOfCurrentAccountTokens: 0,
    nbOfHealthInsuranceTokens: 0,
    nbOfUnemploymentTokens: 0,
    nbOfRetirementTokens: 0,
  });
  const handleOnClickBalanceOf = async (address) => {
    const res = await token.balanceOf(address);
    setBalance(ethers.utils.formatEther(res));
  };
  const handleOnClickCitizen = async (address) => {
    const res = await government.getCitizen(address);
    setCitizen({
      isAlive: res.isAlive ? "alive" : "not alive",
      employer:
        res.employer !== ethers.constants.AddressZero
          ? res.employer.toString()
          : "no employer registered",
      isWorking: res.isWorking ? "is working" : "unemployed",
      isSick: res.isSick ? "is sick" : "healthy",
      retirementDate: new Date(res.retirementDate * 1000).toUTCString(),
      nbOfCurrentAccountTokens: ethers.utils.formatEther(
        res.nbOfCurrentAccountTokens
      ),
      nbOfHealthInsuranceTokens: ethers.utils.formatEther(
        res.nbOfHealthInsuranceTokens
      ),
      nbOfUnemploymentTokens: ethers.utils.formatEther(
        res.nbOfUnemploymentTokens
      ),
      nbOfRetirementTokens: ethers.utils.formatEther(res.nbOfRetirementTokens),
    });
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          id="address"
          name="address"
          placeholder="address"
          className="form-control"
          onChange={(e) => {
            setInputAddress(e.target.value);
          }}
        />
        <button
          type="submit"
          className="btn btn-outline-dark"
          onClick={() => handleOnClickBalanceOf(inputAddress)}
        >
          balance of
        </button>
        <button
          type="submit"
          className="btn btn-outline-dark"
          onClick={() => handleOnClickCitizen(inputAddress)}
        >
          citizen details
        </button>
      </div>
      {balance > 0 && (
        <dl className="row">
          <dt className="col-sm-3">Balance of tokens : </dt>
          <dd className="col-sm-9">{balance}</dd>
        </dl>
      )}
      {citizen.isAlive === "alive" && (
        <dl className="row">
          <dt className="col-sm-3">Life status : </dt>
          <dd className="col-sm-9">{citizen.isAlive}</dd>
          <dt className="col-sm-3">Employer : </dt>
          <dd className="col-sm-9">{citizen.employer}</dd>
          <dt className="col-sm-3">Working status : </dt>
          <dd className="col-sm-9">{citizen.isWorking}</dd>
          <dt className="col-sm-3">Health Status : </dt>
          <dd className="col-sm-9">{citizen.isSick}</dd>
          <dt className="col-sm-3">Date of retirement : </dt>
          <dd className="col-sm-9">{citizen.retirementDate}</dd>
          <dt className="col-sm-3">Nb tokens in current account : </dt>
          <dd className="col-sm-9">{citizen.nbOfCurrentAccountTokens}</dd>
          <dt className="col-sm-3">Health Insurance Tokens : </dt>
          <dd className="col-sm-9">{citizen.nbOfHealthInsuranceTokens}</dd>
          <dt className="col-sm-3">Unemployment Tokens : </dt>
          <dd className="col-sm-9">{citizen.nbOfUnemploymentTokens}</dd>
          <dt className="col-sm-3">Retirement Tokens : </dt>
          <dd className="col-sm-9">{citizen.nbOfRetirementTokens}</dd>
        </dl>
      )}
    </>
  );
}

export default Citizenship;
