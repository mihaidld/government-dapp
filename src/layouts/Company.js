import React from "react";
import BuyTokens from "../components/BuyTokens";
import PaySalary from "../components/PaySalary";
import ChangeEmployment from "../components/ChangeEmployment";

function Company() {
  return (
    <>
      <h2 className="h1">Company affairs</h2>
      <BuyTokens />
      <PaySalary />
      <ChangeEmployment />
    </>
  );
}

export default Company;
