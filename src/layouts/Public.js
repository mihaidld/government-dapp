import React from "react";
import GetCitizen from "../components/GetCitizen";
import GetBalance from "../components/GetBalance";
import CheckCompany from "../components/CheckCompany";
import CheckHospital from "../components/CheckHospital";

/* TODO: consider using useReducer and context for contracts */

function Public() {
  return (
    <>
      <h2 className="h2 mb-3">Public information</h2>
      <GetBalance />
      <GetCitizen />
      <CheckCompany />
      <CheckHospital />
    </>
  );
}

export default Public;
