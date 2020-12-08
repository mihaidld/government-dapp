import React from "react";
import CompanyRegistration from "../components/CompanyRegistration";
import HospitalRegistration from "../components/HospitalRegistration";
import Denaturalize from "../components/Denaturalize";

function Owner() {
  return (
    <>
      <h2 className="h2 mb-3 text-center">Owner Management</h2>
      <div className="shadow-sm rounded p-3 mb-3">
        <CompanyRegistration />
        <HospitalRegistration />
        <Denaturalize />
      </div>
    </>
  );
}

export default Owner;
