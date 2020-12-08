import React from "react";
import GetCitizen from "../components/GetCitizen";
import GetBalance from "../components/GetBalance";
import CheckCompany from "../components/CheckCompany";
import CheckHospital from "../components/CheckHospital";

/* TODO: consider using useReducer and context for contracts */

function Public() {
  return (
    <>
      <h2 className="h2 mb-3 text-center text-primary">Public information</h2>
      <div className="shadow-sm rounded p-3 mb-3 text-primary">
        <GetBalance />
        <GetCitizen />
        <CheckCompany />
        <CheckHospital />
      </div>
    </>
  );
}

export default Public;
