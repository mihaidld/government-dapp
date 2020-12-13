import React from "react";
import BuyTokens from "../components/BuyTokens";
import PaySalary from "../components/PaySalary";
import ChangeEmployment from "../components/ChangeEmployment";

function Company() {
  return (
    <section className="mb-3">
      <hr />
      <h2 className="h2 text-primary mb-3 pt-3" id="company">
        <span className="badge bg-primary">Business</span>
      </h2>
      <div className="py-3 mb-3">
        <BuyTokens />
        <PaySalary />
        <ChangeEmployment />
        <p className="text-decoration-underline">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to the top</a>
        </p>
      </div>
    </section>
  );
}

export default Company;
