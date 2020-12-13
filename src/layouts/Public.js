import React from "react";
import GetCitizen from "../components/GetCitizen";
import GetBalance from "../components/GetBalance";
import CheckCompany from "../components/CheckCompany";
import CheckHospital from "../components/CheckHospital";

/* TODO: consider using useReducer and context for contracts */

function Public() {
  return (
    <section className="mb-3">
      <h2 className="h2 text-primary mb-3 pt-3" id="public">
        <span className="badge bg-primary">Public information</span>
      </h2>
      <div className="py-3 mb-3">
        <GetBalance />
        <GetCitizen />
        <CheckCompany />
        <CheckHospital />
        <p className="text-decoration-underline">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to the top</a>
        </p>
      </div>
    </section>
  );
}

export default Public;
