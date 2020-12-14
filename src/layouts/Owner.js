import React from "react";
import CompanyRegistration from "../components/CompanyRegistration";
import HospitalRegistration from "../components/HospitalRegistration";
import Denaturalize from "../components/Denaturalize";

function Owner() {
  return (
    <section className="mb-3">
      <hr />
      <h2 className="h2 text-primary mb-3 pt-3" id="owner">
        <span className="badge bg-primary">Sovereign Functions</span>
      </h2>
      <div className="py-3 mb-3">
        <CompanyRegistration />
        <HospitalRegistration />
        <Denaturalize />
        <p className="text-decoration-underline">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to the top</a>
        </p>
      </div>
    </section>
  );
}

export default Owner;
