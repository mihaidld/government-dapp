import React from "react";
import ChangeHealth from "../components/ChangeHealth";

function Hospital() {
  return (
    <>
      <h2 className="h2 mb-3 text-center">Hospital Management</h2>
      <div className="shadow-sm rounded p-3 mb-3">
        <ChangeHealth />
      </div>
    </>
  );
}

export default Hospital;
