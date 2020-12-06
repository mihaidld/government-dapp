import React from "react";
import CompanyRegistration from "../components/CompanyRegistration";
import HospitalRegistration from "../components/HospitalRegistration";
import Denaturalize from "../components/Denaturalize";

function Owner() {
  return (
    <>
      <h2 className="h1">Owner affairs</h2>
      <CompanyRegistration />
      <HospitalRegistration />
      <Denaturalize />
    </>
  );
}

export default Owner;
