import React from "react";
import BuyTokens from "../components/BuyTokens";
import PaySalary from "../components/PaySalary";
import ChangeEmployment from "../components/ChangeEmployment";

function Company() {
  return (
    <>
      <h2 className="h2 mb-3 text-center">Company Management</h2>
      <div className="shadow-sm rounded p-3 mb-3">
        <BuyTokens />
        <PaySalary />
        <ChangeEmployment />
      </div>
    </>
  );
}

export default Company;
