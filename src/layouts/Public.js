import React, { useContext } from "react";
import { DappContext } from "../context/DappContext";
import GetCitizen from "../components/GetCitizen";
import GetBalance from "../components/GetBalance";

/* TODO: consider using useReducer and context for contracts */

function Public() {
  const { citizen } = useContext(DappContext);
  return (
    <>
      {citizen.isAlive === "alive" && (
        <>
          <p>You are a citizen with the following details</p>
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
            <dd className="col-sm-9">{citizen.retirementDate.toUTCString()}</dd>
            <dt className="col-sm-3">Nb tokens in current account : </dt>
            <dd className="col-sm-9">{citizen.currentTokens}</dd>
            <dt className="col-sm-3">Health Insurance Tokens : </dt>
            <dd className="col-sm-9">{citizen.healthTokens}</dd>
            <dt className="col-sm-3">Unemployment Tokens : </dt>
            <dd className="col-sm-9">{citizen.unemploymentTokens}</dd>
            <dt className="col-sm-3">Retirement Tokens : </dt>
            <dd className="col-sm-9">{citizen.retirementTokens}</dd>
          </dl>
        </>
      )}
      <GetBalance />
      <GetCitizen />
    </>
  );
}

export default Public;
