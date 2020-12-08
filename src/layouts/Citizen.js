import React from "react";
import GetRetired from "../components/GetRetired";

function Citizen() {
  return (
    <>
      <h2 className="h2 mb-3 text-center">Citizenship</h2>
      <div className="shadow-sm rounded p-3 mb-3">
        <GetRetired />
      </div>
    </>
  );
}

export default Citizen;
